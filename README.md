# From iPhone Policia!

Catching non-Apple social-media influencers who prefer Apple :policeman:

## Why

Because at first it just seemed like a cool idea. Then after running it, you realize 
how many interesting things there is to do with this data.

* Can we determine the sentiment from the tweet?
* Not all tweets are in english, how well can we translate them?
* Can we go beyond looking for `#ad` to determine a sponsored post or not?

## How this could work

Obviously, this is no where close.

```
                 ┌─────────────────────────┐
                 |     Tweet Ingestion     |
                 └─────────────────────────┘
                             |
                      Qualifying Tweet
                             |
                             ▼
                   ┌───────────────────┐
                   |     SQS Queue     |
                   └───────────────────┘ 
                             |
                             ▼ 
    ┌───────────────Step Function Chain───────────────┐
    |                                                 |
    |              ┌───────────────────┐              |
    |              |     Translate     |              |
    |              └───────────────────┘              |
    |                        |                        |
    |                        ▼                        |
    |              ┌───────────────────┐              |
    |              |   Get Sentiment   |              |
    |              └───────────────────┘              |
    |                        |                        |
    |                        ▼                        |
    |              ┌───────────────────┐              |
    |              |   Is this an Ad   |              |
    |              └───────────────────┘              |
    |                        |                        |
    |                        ▼                        |
    |              ┌───────────────────┐              |
    |              |   Generate Image  |              |
    |              |     of Tweet      |              |
    |              └───────────────────┘              |
    |                        |                        |
    |                        ▼                        |
    |              ┌───────────────────┐              |
    |              |  Reply to author  |              |
    |              |     of Tweet      |              |
    |              └───────────────────┘              |
    |                        |                        |
    |                        ▼                        |
    |              ┌───────────────────┐              |
    |              | Store in national |              |
    |              |      archives     |              |
    |              └───────────────────┘              |
    |                                                 |
    └─────────────────────────────────────────────────┘ 