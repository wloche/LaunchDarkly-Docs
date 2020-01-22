---
title: "Environments"
excerpt: ""
---
## Overview
This topic explains what environments are in LaunchDarkly and how to use them to manage different business areas or areas of your product lifecycle.

Environments are organizational units contained within projects. Environments allow you to manage your feature flags throughout your entire development lifecycle, from local development through production. Typical environments within a project could be Production, QA, Staging, or individual environments.

Your LaunchDarkly account supports an unlimited number of projects, environments, flags, and server-side Monthly Active Users (MAU). If you are on a **legacy Starter plan**, your account may be limited to two projects and two environments. Contact our Support team at support@launchdarkly.com to remove those restrictions.

You can create multiple environments within each project, and all projects must have at least one environment. To learn more about projects, read [Projects](./projects).

## Getting started with environments
Your first project has two environments, `Test` and `Production`, by default. Each environment has its own SDK key, which is used to connect the LaunchDarkly SDK to a specific environment.

Each feature flag that you create has its own set of targeting rules for each environment.  This means that you can change your flag rollout rules in a development or staging environment for QA testing before rolling out to production. 

The LaunchDarkly sidebar has a dropdown widget that shows you the current project and environment and allows you to quickly switch between projects and environments.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d8d5074-Screen_Shot_2019-08-06_at_3.02.11_PM.png",
        "Screen Shot 2019-08-06 at 3.02.
1. PM.png",
        657,
        493,
        "#ebeee9"
      ],
      "caption": "The environment picker."
    }
  ]
}
[/block]
You can manage your environments from the Account settings page. Here, you can add new environments to a project (for example, to give each developer on your team their own environment for local testing). 

To add a new environment:

1. Navigate to the **Account Settings** page.
2. Click **New Environment**. The "Create an environment" screen appears.
<Callout intent="alert">
   <Callout.Title>Make sure you're in the right project</Callout.Title>
   <Callout.Description>Confirm you're creating the environment in the project where you want it to live. You cannot move an environment from one project to another.
   </Callout.Description>
</Callout>

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/097709c-Screen_Shot_2019-08-06_at_3_04_17_PM.png",
        "Screen_Shot_2019-08-06_at_3_04_17_PM.png",
        1100,
        315,
        "#f2f4f3"
      ],
      "caption": "The Account Settings page with the new environment button called out."
    }
  ]
}
[/block]
4. Give your environment a human-readable **Name**. 
5. (Optional) Give your environment a unique **Key**. This field populates automatically based on your name, but you can change it now if you wish.
6. (Optional) Add **Tags**.
7. (Optional) Select the **Enable secure mode** checkbox to ensure a user of the client-side SDK cannot impersonate another user.
8. (Optional) Select the **Require comments for flag and segment changes** checkbox to force members who modify flags and user segments to leave a comment to explain their changes.
<Callout intent="info">
  <Callout.Title>Comments help establish a change history</Callout.Title>
   <Callout.Description>Requiring members to leave comments when they change flags or segments helps future users understand why flags or segments look and behave certain ways.</Callout.Description>
</Callout>
9. (Optional) Select the **Require confirmation for flag and segment changes** checkbox to force members who modify flags and user segments to verify they wish to make these changes. 
<Callout intent="info">
  <Callout.Title>Confirm changes helps prevent mistakes</Callout.Title>
   <Callout.Description>Requiring members to confirm that they wish to make changes may help them from changing the wrong flag or segment inadvertently.</Callout.Description>
</Callout>
10. (Optional) Select the **Send detailed events to data export destinations** checkbox to enable data export for every flag created in this environment after this checkbox is selected. To learn more, read [Data Export](./data-export).
1
1. (Optional) Specify a **TTL** between 0 and 60 minutes. TTL, or Time to Live, is a setting in DNS records that dictates how long the record should be cached by nameservers and browsers.
<Callout intent="info">
  <Callout.Title>PHP users need a TTL setting</Callout.Title>
   <Callout.Description>The TTL setting checkbox only applies to environments using the PHP SDK. 
To learn more, read [TTL settings](#ttl-settings).</Callout.Description>
</Callout>
12. Choose a **Color** to differentiate this environment from other environments. 
13. Click **Save Environment**. The new environment appears on the Account Settings page.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/10f5143-Screen_Shot_2019-08-06_at_3.22.02_PM.png",
        "Screen Shot 2019-08-06 at 3.22.02 PM.png",
        447,
        820,
        "#e8e6ec"
      ],
      "caption": "The Create an environment screen."
    }
  ]
}
[/block]

## Migrating content between environments
You can migrate some, but not all, content between environments. Compare and copy flag settings between environments from the LaunchDarkly UI. To learn more, read [Compare and copy flag settings](./compare-and-copy-flag-settings).

Alternatively, use the REST API to migrate flags from one environment to another. First, GET the feature flag you wish to import, then PATCH to update the flag configuration in production. 

To learn more about these endpoints, read [Get feature flag](https://apidocs.launchdarkly.com/reference#get-feature-flag) and [Update feature flag](https://apidocs.launchdarkly.com/reference#update-feature-flag).

## Resetting an environment's SDK key
If you need to reset an SDK key for an environment, navigate to the Account Settings page and click **Edit** next to the environment you wish to change.

When editing your environment, you'll see the option to reset your SDK key for that environment. Clicking the "Reset SDK Key" button will bring up a confirmation screen. From there you have the option to keep the old SDK key active for a period of time.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/6079289-Screen_Shot_2018-02-01_at_12.54.39_PM.png",
        "Screen Shot 2018-02-01 at 12.54.39 PM.png",
        493,
        337,
        "#f8f8f9"
      ]
    }
  ]
}
[/block]

## <a name="ttl-settings"></a>TTL settings
Each environment also has a time-to-live (TTL) setting. This sets the number of minutes that the PHP SDK can cache feature flag rules locally. 

The TTL is only used in our PHP SDK, since PHP's shared-nothing architecture makes our streaming model impossible.

For customers using PHP, we recommend setting your TTL to at least 5 minutes in production environments. This lets our SDKs cache feature flag rules for 5 minutes, so most calls to `variation` will not make a remote request. The tradeoff is that changes you make to your feature flag rules on your dashboard will not take effect for 5 minutes. 

If your site has relatively low traffic (fewer than one request per minute), you may wish to increase the TTL to 5 minutes or more to take better advantage of the local cache.

If the TTL is set to 0 minutes, the SDK will not use a local cache, and every call to `variation` will make a remote request to our CDN. You can set your TTL to 0  in testing environments to see changes reflected immediately, but we do not recommend a 0 minute TTL in production.

In high volume PHP environments, we strongly recommend using our Relay Proxy. To learn more, read [The LaunchDarkly Relay Proxy](./the-relay-proxy).