# Fuck off, @twitter

This tiny script automated that for me:

> I&#39;m sorry dear followers, but every time [@twitter](https://twitter.com/twitter) makes me re-select &quot;latest tweet&quot; I&#39;m gonna tweet that over and over again (and I do encourage you to do the same; I promise my support in the form of RTs): https://t.co/yIpedfHvIc
>
> &mdash; Eduardo Cuducos, [November 20, 2019](https://twitter.com/cuducos/status/1197153914916888579)

## Requirements

* [Rust](https://www.rust-lang.org/) with `cargo`

## Settings

1. Create an app and get your API keys from [Twitter's Developer platform]([https://developer.twitter.com/](https://developer.twitter.com/))
2. Create environment variables as described in `.env.sample`
    1. The `TWEET` variable is the text you want to tweet when this script runs
    1. **Optionally**, if you want this tweet to be a reply for a given tweet, add the status ID number of that given tweet into `REPLY_TO` (otherwise just ignore it)

For example, these last two settings look like that in my case:

```
TWEET=Fuck off @twitter, let me have "lastest tweets" as a default.
REPLY_TO=1197153914916888579
```

## Running

```console
$ cargo run
https://twitter.com/cuducos/status/1194269206419775488
```

This will be the URL for your fresh new tweet!
