# How onthegrow.ai Gets Deployed

Written October 20, 2026 from a read only inspection of this laptop, the GitHub repository, the AWS account, and public DNS. Nothing was changed or deployed to produce this file. Every identifier below was read from the live systems, not from memory.

## The short version

The website is a folder of plain HTML, CSS, and JavaScript. There is no build step. When a commit is pushed to the `main` branch on GitHub, a GitHub Actions workflow zips the site and hands the zip to AWS Amplify Hosting. Amplify publishes it to its own CloudFront distribution in about eight seconds.

The domain onthegrow.ai is registered at GoDaddy, but GoDaddy only holds the registration. GoDaddy points the domain's nameservers at Amazon Route 53. The Route 53 records point onthegrow.ai and www.onthegrow.ai at Amplify's CloudFront distribution.

The whole chain, in order:

1. You edit files in `~/onthegrow/onthegrow-ai-site` and preview on localhost.
2. You commit and push to `main` on GitHub.
3. GitHub Actions runs `.github/workflows/deploy.yml`.
4. The workflow zips the site and uploads it to Amplify app `d144i82z7jj6d1` in region us-east-2.
5. Amplify unpacks it and refreshes its CloudFront distribution `drrh5ck6td0uk.cloudfront.net`.
6. A visitor types onthegrow.ai. GoDaddy says "ask Amazon." Route 53 answers with CloudFront's addresses. CloudFront serves the files.

## Where the project lives

| What | Where |
|---|---|
| Local working copy | `/home/elizabeth/onthegrow/onthegrow-ai-site` (the only clone on this computer) |
| Project rules | `/home/elizabeth/onthegrow/CLAUDE.md` and `/home/elizabeth/onthegrow/VOICE.md` |
| GitHub repository | https://github.com/onthegrow-leadership/onthegrow-ai-site (public, default branch `main`) |
| GitHub account used by `gh` on this laptop | onthegrow-leadership |
| Deploy workflow | `.github/workflows/deploy.yml` inside the repository |
| Local preview | `python3 -m http.server 8123 --bind 0.0.0.0 --directory ~/onthegrow/onthegrow-ai-site` then open http://localhost:8123 |

The `~/Downloads/OTG-site-update-Oct17` and `~/Downloads/OTG-Resources-PDFs-Oct17` folders are spec bundles, not copies of the site.

Top level contents of the site: `index.html` (home page), `readiness/` (the assessment), `resources/` (resources page), `assets/` (images, scripts, including `book-launch.js`), `favicon.svg`, `book-summary.pdf`, `evidence-brief.pdf`, and `README.md`.

## The AWS side

### Account

| Setting | Value |
|---|---|
| AWS account ID | 171022098921 |
| Account alias | none |
| Region for the app | us-east-2 (US East, Ohio) |

Route 53 and IAM are global services, so they have no region.

### Two IAM users

IAM (Identity and Access Management) is where AWS keeps logins and permissions. This account has exactly two users.

| User | Created | Permissions | Where its key is used |
|---|---|---|---|
| `Elizabeth` | Aug 3, 2026 | AdministratorAccess, meaning full control of the whole account | `~/.aws/credentials` on this laptop, the `default` profile. Key ID ends in TBIF. This is what the `aws` command uses here. |
| `amplify-ci-onthegrow-ai` | Aug 4, 2026, 00:55 UTC | One inline policy named `amplify-deploy-onthegrow-ai`. It allows only CreateDeployment, StartDeployment, GetJob, ListJobs, GetApp, and GetBranch, and only on app `d144i82z7jj6d1`. | GitHub repository secrets `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. Key ID ends in PRCP. |

GitHub never shows a secret's value, so the match between the CI user and the GitHub secrets is inferred. The evidence is strong: the secrets were created three seconds after the user, the user has exactly one key, and its permissions are exactly what the workflow calls.

### The Amplify app

AWS Amplify Hosting is Amazon's service for hosting static websites. It stores your files and serves them through CloudFront, Amazon's global content delivery network.

| Setting | Value |
|---|---|
| Service | AWS Amplify Hosting |
| App name | onthegrow-ai |
| App ID | d144i82z7jj6d1 |
| Description | OnTheGrow.ai marketing site |
| Region | us-east-2 |
| Created | Aug 3, 2026, 8:50 PM Eastern |
| Platform | WEB (static files) |
| Branch | main (the only branch in Amplify) |
| Git connection | None. Amplify is not linked to GitHub and never pulls code itself. It only receives zip uploads. |
| Build spec, environment variables | None |
| Redirect or rewrite rules | None |
| Custom headers | None |
| Password protection | Off |
| Amplify's own URL | https://main.d144i82z7jj6d1.amplifyapp.com |
| CloudFront distribution Amplify runs for you | drrh5ck6td0uk.cloudfront.net |
| Deploys so far | 14. The latest, job 14, ran Oct 17, 2026 at 10:16 PM Eastern and took 8 seconds. |
| Console | https://us-east-2.console.aws.amazon.com/amplify/apps/d144i82z7jj6d1/overview (make sure the region picker says Ohio) |

There is no S3 bucket and no CloudFront distribution in your account. Amplify owns the storage and the distribution on your behalf. The `server: AmazonS3` header the site returns is Amplify's internal storage, not a bucket you can see or manage.

## Build and deploy commands

### There is no build

The site is hand written HTML. "Build" in this project means `zip`. There is no npm, no bundler, no `amplify.yml`, and no build settings in Amplify.

### What runs on every push to main

The workflow file is `.github/workflows/deploy.yml`, titled "Deploy to AWS Amplify."

Trigger: a push to `main`, nothing else. Pull requests and other branches do not deploy. There is no manual run button because the workflow has no `workflow_dispatch` trigger.

Concurrency: group `amplify-deploy`, with cancel in progress turned off. Two quick pushes queue up and deploy one after the other.

Variables set in the workflow: `AWS_REGION=us-east-2`, `APP_ID=d144i82z7jj6d1`, `BRANCH=main`.

Steps, in order:

1. `actions/checkout@v4` checks out the pushed commit on an Ubuntu runner.
2. `aws-actions/configure-aws-credentials@v4` signs the runner in as the CI user using the two repository secrets, region us-east-2.
3. Package site:

   ```sh
   zip -r site.zip index.html favicon.svg assets readiness resources book-summary.pdf evidence-brief.pdf
   ```

4. Create deployment. This returns a `jobId` and a one time upload URL called `zipUploadUrl`.

   ```sh
   aws amplify create-deployment --app-id d144i82z7jj6d1 --branch-name main
   ```

5. Upload the zip to that URL:

   ```sh
   curl -sf -H "Content-Type: application/zip" --upload-file site.zip "<zipUploadUrl>"
   ```

6. Start the deployment:

   ```sh
   aws amplify start-deployment --app-id d144i82z7jj6d1 --branch-name main --job-id <jobId>
   ```

7. Wait. The workflow polls `aws amplify get-job` every 10 seconds, up to 30 times (five minutes). `SUCCEED` passes the run. `FAILED` or a timeout fails it.

A typical run takes about 25 seconds on GitHub. Amplify's own job has two steps, DEPLOY and VERIFY, and finishes in about eight seconds. Amplify clears its CloudFront cache on every deploy, so there is nothing to invalidate by hand.

One rule matters more than the rest. Only the files named on the `zip` line reach the live site. If a new top level file or folder is added, it must be added to that line too, or it will deploy as a 404. `README.md` and `.github` are left out on purpose.

The Deploy section in `README.md` is out of date. It lists only `index.html favicon.svg assets readiness`. The workflow file is the source of truth.

### How a normal release happens

1. Edit files in `~/onthegrow/onthegrow-ai-site`.
2. Preview at http://localhost:8123 (command in the table above).
3. Commit and push:

   ```sh
   cd ~/onthegrow/onthegrow-ai-site
   git add -A
   git commit -m "Your message"
   git push origin main
   ```

4. Watch the deploy:

   ```sh
   gh run list --workflow=deploy.yml --limit 1
   gh run watch <run id> --exit-status
   ```

   Or open https://github.com/onthegrow-leadership/onthegrow-ai-site/actions

5. Confirm the live site is fresh:

   ```sh
   curl -sI https://onthegrow.ai/ | grep -i x-cache
   ```

   `Miss from cloudfront` right after a deploy means CloudFront fetched new content.

### Manual deploy from this laptop (fallback only)

The same four commands work from here because the `default` AWS profile on this laptop is an admin in the same account. Keep this as a fallback. It publishes whatever is in the folder, including uncommitted edits, so GitHub would stop matching the live site.

```sh
cd ~/onthegrow/onthegrow-ai-site
zip -r /tmp/site.zip index.html favicon.svg assets readiness resources book-summary.pdf evidence-brief.pdf
aws amplify create-deployment --app-id d144i82z7jj6d1 --branch-name main
curl -H "Content-Type: application/zip" --upload-file /tmp/site.zip "<zipUploadUrl from the previous output>"
aws amplify start-deployment --app-id d144i82z7jj6d1 --branch-name main --job-id <jobId from the previous output>
aws amplify get-job --app-id d144i82z7jj6d1 --branch-name main --job-id <jobId> --query job.summary.status
```

To redeploy the current commit with no content change, push an empty commit:

```sh
git commit --allow-empty -m "Redeploy" && git push origin main
```

## How the domain connects: GoDaddy to Route 53 to Amplify

Three parties share the job.

### 1. GoDaddy holds the registration

You bought onthegrow.ai at GoDaddy and renew it there. In GoDaddy's settings for the domain, the nameservers are set to custom values, these four Amazon servers:

```
ns-186.awsdns-23.com
ns-668.awsdns-19.net
ns-1773.awsdns-29.co.uk
ns-1474.awsdns-56.org
```

That is GoDaddy's entire role. Because the nameservers point at Amazon, the internet asks Amazon for every record. Anything typed into GoDaddy's own DNS page is ignored. The domain is not registered in Route 53, so renewal and ownership stay at GoDaddy.

This laptop has no GoDaddy login, so the registrar and nameservers were confirmed from public WHOIS and DNS lookups rather than from inside the GoDaddy account.

### 2. Route 53 answers DNS

Route 53 is Amazon's DNS service, the phone book that turns onthegrow.ai into server addresses.

| Setting | Value |
|---|---|
| Hosted zone | onthegrow.ai |
| Zone ID | Z00023982YKH94VD789ZS |
| Account | 171022098921 |
| Console | https://us-east-1.console.aws.amazon.com/route53/v2/hostedzones#ListRecordSets/Z00023982YKH94VD789ZS |

The zone has five records:

| Name | Type | Points to | Purpose |
|---|---|---|---|
| onthegrow.ai | A, alias | drrh5ck6td0uk.cloudfront.net | bare domain to Amplify |
| www.onthegrow.ai | CNAME, TTL 500 | drrh5ck6td0uk.cloudfront.net | www to Amplify |
| _a1c91c96ee9e88543f0ca1a8a5a70c7e.onthegrow.ai | CNAME, TTL 300 | _826b531cc8cf8cf49b9f7773fd947c96.jkddzztszm.acm-validations.aws | proves to Amazon that you own the domain, so the HTTPS certificate can be issued and renewed |
| onthegrow.ai | NS | the four awsdns servers above | standard |
| onthegrow.ai | SOA | standard | standard |

There are no MX records, so no email is routed through this domain's DNS.

### 3. Amplify owns the custom domain and the certificate

Inside the Amplify app, the domain onthegrow.ai is attached with status AVAILABLE. Two names map to the `main` branch: the bare domain and `www`. Automatic subdomains are off.

The HTTPS certificate is Amplify managed, issued by Amazon, and covers both onthegrow.ai and *.onthegrow.ai. It renews on its own as long as the validation CNAME above stays in Route 53. No certificate appears in your own Certificate Manager because Amplify holds it.

Amplify reports `www` as verified and the bare domain as not verified. That flag is cosmetic. Amplify looks for a CNAME, and a bare domain cannot use a CNAME, so Route 53 uses an alias A record instead, which is the correct setup. Both names resolve and serve the site over HTTPS with a valid certificate.

### What a visitor experiences

| Request | Result |
|---|---|
| http://onthegrow.ai | 301 redirect to https://onthegrow.ai/ (Amplify default) |
| https://onthegrow.ai | the site |
| https://www.onthegrow.ai | the site, with no redirect to the bare domain |
| https://main.d144i82z7jj6d1.amplifyapp.com | the same site on Amplify's own address |

There are no redirect rules in Amplify, so visitors stay on whichever name they typed.

## Timeline

All dates are 2026.

| When | What |
|---|---|
| Aug 3, evening Eastern | IAM user `Elizabeth` and admin key created. Amplify app created at 8:50 PM. First commit, deploy workflow added. CI user and its GitHub secrets created at 8:55 PM. |
| Sep 24 | Workflow YAML fix: a colon in the curl header broke parsing. |
| Sep 25 and 26 | Zip line grew to include `resources`, then the two PDFs. |
| Oct 17 | Deploy 14, the most recent. |

## What would take the site down, and where to fix it

| Failure | Effect | Where to look |
|---|---|---|
| GoDaddy registration lapses, or nameservers reset to GoDaddy defaults | Whole domain stops resolving | GoDaddy. Set nameservers back to the four awsdns names. |
| Route 53 zone deleted or the two CloudFront records removed | Domain stops resolving | Route 53, zone Z00023982YKH94VD789ZS |
| Validation CNAME removed | Certificate cannot renew. HTTPS warnings appear months later. | Route 53 |
| CI user key deleted or GitHub secrets changed | Pushes stop deploying. The workflow fails at "Configure AWS credentials" or "Create deployment." The live site stays on the last deploy. | IAM user `amplify-ci-onthegrow-ai` and GitHub repository secrets |
| New file not added to the zip line | Deploy succeeds, new page returns 404 | `.github/workflows/deploy.yml` |
| Amplify app deleted | Site down | Amplify. The files can be redeployed from Git, but the domain association would have to be rebuilt. |

## Security notes

Nothing was changed. These are observations.

The admin key in `~/.aws/credentials` can do anything in the account, including delete everything. Keep this laptop's disk encrypted and never copy that file anywhere.

The CI key is tightly scoped to deploying this one app. That is the right design.

The GitHub repository is public. That is fine for a public website, but it means nothing secret can ever be committed. The AWS secrets live in GitHub's encrypted secrets store, not in the repository.

Both access keys date from August 2026. AWS recommends rotating long lived keys periodically. Not urgent.

## What this inspection could not see

The inside of the GoDaddy account. The registrar and nameserver facts come from public WHOIS and DNS.

The values of the two GitHub secrets. GitHub never reveals them, only their names and creation dates.
