# Fuck off, @twitter [![GitHub Actions: Black](https://github.com/cuducos/fuckoff-twitter/workflows/Black/badge.svg)]()<br><small>Let me have "lastest tweets" as a default.</small>

This tiny script automated that for me:

> I&#39;m sorry dear followers, but every time [@twitter](https://twitter.com/twitter) makes me re-select &quot;latest tweet&quot; I&#39;m gonna tweet that over and over again (and I do encourage you to do the same; I promise my support in the form of RTs): https://t.co/yIpedfHvIc
>
> &mdash; Eduardo Cuducos, [November 20, 2019](https://twitter.com/cuducos/status/1197153914916888579)

## Requirements

* [Python](https://python.org) 3.7+
* [Pipenv](https://pipenv.readthedocs.io)

## Settings

1. Create an app and get your API keys from [Twitter's Developer platform]([https://developer.twitter.com/](https://developer.twitter.com/))
2. Copy `.env.sample` as `.env` and add the API keys from the previous step
3. In the `.env`, insert into `TWEET` the text you want to tweet when this script runs
4. **Optionally**, if you want this tweet to be a reply for a given tweet, add the status ID number of that given tweet into `REPLY_TO` (otherwise just leave it blank)

For example, these last two settings look like that in my case:

```
TWEET=Fuck off @twitter, let me have "lastest tweets" as a default.
REPLY_TO=1197153914916888579
```

## Running

```console
$ pipenv run python -m fuckoff
https://twitter.com/cuducos/status/1194269206419775488
```

This will be the URL for your fresh new tweet!
