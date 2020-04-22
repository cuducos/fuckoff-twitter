use egg_mode::error::Error;
use egg_mode::tweet;
use egg_mode::KeyPair;
use egg_mode::Token;
use std::env;
use std::process::exit;
use std::string::String;

const STATUS_IS_A_DUPLICATE_ERROR_CODE: i32 = 187;

fn load_env_var(key: &str) -> String {
    match env::var(key) {
        Ok(value) => value,
        Err(_) => "".to_string(),
    }
}

struct Auth {
    consumer_key: String,
    consumer_secret: String,
    access_token: String,
    access_token_secret: String,
}

struct Config {
    auth: Auth,
    tweet: String,
    reply_to: Option<u64>,
}

fn load_config() -> Config {
    let consumer_key = load_env_var("CONSUMER_KEY");
    let consumer_secret = load_env_var("CONSUMER_SECRET");
    let access_token = load_env_var("ACCESS_TOKEN");
    let access_token_secret = load_env_var("ACCESS_TOKEN_SECRET");
    let tweet = load_env_var("TWEET");
    if consumer_key == ""
        || consumer_secret == ""
        || access_token == ""
        || access_token_secret == ""
        || tweet == ""
    {
        eprintln!("Error: missing environment variables.");
        exit(1)
    }

    let reply_to = load_env_var("REPLY_TO").parse::<u64>().ok();
    let auth = Auth {
        consumer_key,
        consumer_secret,
        access_token,
        access_token_secret,
    };
    Config {
        auth,
        tweet,
        reply_to,
    }
}

async fn check_reply_tweet(id: u64, token: &Token) -> bool {
    let exists = match tweet::show(id, token).await {
        Ok(_) => true,
        Err(_) => false,
    };
    if exists == false {
        println!("Couldn't finr the tweet to reply to.");
    }
    exists
}

#[tokio::main]
async fn main() {
    let config = load_config();
    let consumer = KeyPair::new(config.auth.consumer_key, config.auth.consumer_secret);
    let access = KeyPair::new(config.auth.access_token, config.auth.access_token_secret);
    let token = Token::Access { consumer, access };

    let reply_to = match config.reply_to {
        Some(value) => check_reply_tweet(value, &token).await,
        None => false,
    };

    let mut tweet = tweet::DraftTweet::new(config.tweet);
    if reply_to == true {
        tweet.auto_populate_reply_metadata = Some(false);
        tweet.in_reply_to = config.reply_to;
    }

    match tweet.send(&token).await {
        Ok(tweet) => match &tweet.user {
            Some(user) => println!(
                "https://twitter.com/{}/status/{}",
                user.screen_name, tweet.id
            ),
            None => println!(
                "Tweeted, but couldn't find the URL. Feel free to check your timeline though!"
            ),
        },
        Err(error) => match error {
            Error::TwitterError(_, err) => {
                if err.errors.len() == 1 && err.errors[0].code == STATUS_IS_A_DUPLICATE_ERROR_CODE {
                    eprintln!("Twitter tagged this as a duplicated tweet. Try again later.");
                    exit(1)
                } else {
                    for e in err.errors {
                        eprintln!("Twitter API Error: {:?}", e.message);
                    }
                }
                exit(1)
            }
            error => {
                eprintln!("{:?}", error);
                exit(1)
            }
        },
    };
}
