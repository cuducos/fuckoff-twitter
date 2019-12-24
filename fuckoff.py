from decouple import config
from tweepy import API, OAuthHandler, TweepError


class FuckOff:

    STATUS_IS_A_DUPLICATE_ERROR_CODE = 187

    def __init__(self):
        auth = OAuthHandler(config("CONSUMER_KEY"), config("CONSUMER_SECRET"))
        auth.set_access_token(config("ACCESS_TOKEN"), config("ACCESS_TOKEN_SECRET"))
        self.api = API(auth)

        self.status = config("TWEET")
        self.reply_to = config("REPLY_TO", default=False, cast=int)

    @property
    def kwargs(self):
        """Builds the kwargs to update the status."""
        kwargs = {"status": self.status}

        if not self.reply_to:
            return kwargs

        if not self.api.get_status(self.reply_to):
            return kwargs

        kwargs.update(
            {
                "auto_populate_reply_metadata": False,
                "in_reply_to_status_id": self.reply_to,
            }
        )
        return kwargs

    def log_if_is_duplicate_error(self, error):
        if error.api_code == self.STATUS_IS_A_DUPLICATE_ERROR_CODE:
            return "Twitter tagged this as a duplicated tweet. Try again later."

        raise error

    def __call__(self):
        me = self.api.me()
        try:
            status = self.api.update_status(**self.kwargs)
        except TweepError as error:
            return self.log_if_is_duplicate_error(error)

        return f"https://twitter.com/{me.screen_name}/status/{status.id}"


if __name__ == "__main__":
    print(FuckOff()())
