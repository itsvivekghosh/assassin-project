require("dotenv").config();
const VideoQueries = require("../models/video.model");

class VideoHelper {
  static apiKey = process.env.GOOGLE_API_KEY;
  static apiUrl = process.env.YOUTUBE_API_URL;

  static removeSpecials(str: any) {
    let lower = str.toLowerCase();
    let upper = str.toUpperCase();

    let res = "" as String,
      i = 0,
      n = lower.length,
      t;
    for (i; i < n; ++i) {
      if (lower[i] !== upper[i] || lower[i].trim() === "") {
        t = str[i];
        if (t !== undefined) {
          res += t;
        }
      }
    }
    return new String(res);
  }

  public static async getVideoListFromYoutubeV3API(searchQuery: string) {
    try {
      const url = `${this.apiUrl}/search?key=${this.apiKey}&type=video&part=snippet&maxResults=10&q=${searchQuery}`;
      // let response = fetch(url).then((response) => {
      //   return response.json();
      // });
      let response = {
        kind: "youtube#searchListResponse",
        etag: "ynMeE5IKKpkaAh03SOqUuzYRK4M",
        nextPageToken: "CAoQAA",
        regionCode: "IN",
        pageInfo: {
          totalResults: 1000000,
          resultsPerPage: 10,
        },
        items: [
          {
            kind: "youtube#searchResult",
            etag: "2XlnPp6Q6n066OZYrlvKb8xSl20",
            id: {
              kind: "youtube#video",
              videoId: "5anDTPc8n_U",
            },
            snippet: {
              publishedAt: "2023-03-25T08:00:05Z",
              channelId: "UCp6_KuNhT0kcFk-jXw9Tivg",
              title:
                "Music Mix 2023 🎧 EDM Remixes of Popular Songs 🎧 EDM Best Gaming Music Mix",
              description:
                "Music Mix 2023 EDM Remixes of Popular Songs EDM Best Gaming Music Mix STREAM NOW: ...",
              thumbnails: {
                default: {
                  url: "https://i.ytimg.com/vi/5anDTPc8n_U/default.jpg",
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: "https://i.ytimg.com/vi/5anDTPc8n_U/mqdefault.jpg",
                  width: 320,
                  height: 180,
                },
                high: {
                  url: "https://i.ytimg.com/vi/5anDTPc8n_U/hqdefault.jpg",
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: "Magic Music",
              liveBroadcastContent: "none",
              publishTime: "2023-03-25T08:00:05Z",
            },
          },
          {
            kind: "youtube#searchResult",
            etag: "O-8NJGS1q8B-6eLEoD8487JdLto",
            id: {
              kind: "youtube#video",
              videoId: "JNvnjanVxTM",
            },
            snippet: {
              publishedAt: "2023-03-25T00:02:13Z",
              channelId: "UCPsfM4vuu_FmjQXfWCHdh4g",
              title:
                "Ibiza Summer Mix 2023 � Best Of Tropical Deep House Music Chill Out Mix 2023� Chillout Lounge 88",
              description:
                "Experience deep sleep and deep rest with our Sleepshield sleeping headphones. Soft, breathable, and designed to block out ...",
              thumbnails: {
                default: {
                  url: "https://i.ytimg.com/vi/JNvnjanVxTM/default_live.jpg",
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: "https://i.ytimg.com/vi/JNvnjanVxTM/mqdefault_live.jpg",
                  width: 320,
                  height: 180,
                },
                high: {
                  url: "https://i.ytimg.com/vi/JNvnjanVxTM/hqdefault_live.jpg",
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: "PrizeSleep-Sleeping Music For Deep Sleeping",
              liveBroadcastContent: "live",
              publishTime: "2023-03-25T00:02:13Z",
            },
          },
          {
            kind: "youtube#searchResult",
            etag: "uwQy3K64CvhxmiDglooGY0_6kpM",
            id: {
              kind: "youtube#video",
              videoId: "eqkF0nhwuDk",
            },
            snippet: {
              publishedAt: "2023-03-24T11:30:13Z",
              channelId: "UCvt5p3A11M8zd8iJPCC5XvQ",
              title:
                "Best tiktok songs 🍩 Trending tiktok songs 2023 ~ Tiktok viral songs",
              description:
                "Best tiktok songs Trending tiktok songs 2023 ~ Tiktok viral songs Send us song submissions: lovelifelyrics26@gmail.com ...",
              thumbnails: {
                default: {
                  url: "https://i.ytimg.com/vi/eqkF0nhwuDk/default.jpg",
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: "https://i.ytimg.com/vi/eqkF0nhwuDk/mqdefault.jpg",
                  width: 320,
                  height: 180,
                },
                high: {
                  url: "https://i.ytimg.com/vi/eqkF0nhwuDk/hqdefault.jpg",
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: "Love Life Lyrics",
              liveBroadcastContent: "none",
              publishTime: "2023-03-24T11:30:13Z",
            },
          },
          {
            kind: "youtube#searchResult",
            etag: "CHil9RedrpceT3xG4mAzlERXGHI",
            id: {
              kind: "youtube#video",
              videoId: "UVWJ8eRikA4",
            },
            snippet: {
              publishedAt: "2023-03-24T22:30:09Z",
              channelId: "UCDFm-w2mWNAPy6sqAPcKnkQ",
              title:
                "lofi hip hop radio ~ beats to relax/study 💖 Music to put you in a better mood 👨‍🎓 Calm Your Mind",
              description:
                "lofi hip hop radio ~ beats to relax/study Music to put you in a better mood ‍   Calm Your Mind https://youtu.be/UVWJ8eRikA4 ...",
              thumbnails: {
                default: {
                  url: "https://i.ytimg.com/vi/UVWJ8eRikA4/default_live.jpg",
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: "https://i.ytimg.com/vi/UVWJ8eRikA4/mqdefault_live.jpg",
                  width: 320,
                  height: 180,
                },
                high: {
                  url: "https://i.ytimg.com/vi/UVWJ8eRikA4/hqdefault_live.jpg",
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: "RELAXATION (LoFi & CHILL)",
              liveBroadcastContent: "live",
              publishTime: "2023-03-24T22:30:09Z",
            },
          },
          {
            kind: "youtube#searchResult",
            etag: "xoH9hOTq_WkGlW1F4ZNwStIAYUM",
            id: {
              kind: "youtube#video",
              videoId: "7UmpGBLDLkA",
            },
            snippet: {
              publishedAt: "2023-03-25T01:00:06Z",
              channelId: "UCI0zpW-HyHg745GvGE5kVdw",
              title:
                "Spotify chill playlist 🍇 Tiktok hits 2023 - Viral songs latest 2023",
              description:
                "Spotify chill playlist Tiktok hits 2023 - Viral songs latest 2023 Everyone like, subscribe and press the notification bell to ...",
              thumbnails: {
                default: {
                  url: "https://i.ytimg.com/vi/7UmpGBLDLkA/default.jpg",
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: "https://i.ytimg.com/vi/7UmpGBLDLkA/mqdefault.jpg",
                  width: 320,
                  height: 180,
                },
                high: {
                  url: "https://i.ytimg.com/vi/7UmpGBLDLkA/hqdefault.jpg",
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: "Deep Chill Mix",
              liveBroadcastContent: "none",
              publishTime: "2023-03-25T01:00:06Z",
            },
          },
          {
            kind: "youtube#searchResult",
            etag: "5mm8EBcQ5Kapwf1psJTvRmd032M",
            id: {
              kind: "youtube#video",
              videoId: "u6wOyMUs74I",
            },
            snippet: {
              publishedAt: "2023-03-24T04:00:10Z",
              channelId: "UC0C-w0YjGpqDXGB8IHb662A",
              title: "Ed Sheeran - Eyes Closed [Official Video]",
              description:
                "Listen to Eyes Closed: http://es.lnk.to/eyesclosed Subtract, the new album, out May 5th. Pre-order now: https://es.lnk.to/subtract ...",
              thumbnails: {
                default: {
                  url: "https://i.ytimg.com/vi/u6wOyMUs74I/default.jpg",
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: "https://i.ytimg.com/vi/u6wOyMUs74I/mqdefault.jpg",
                  width: 320,
                  height: 180,
                },
                high: {
                  url: "https://i.ytimg.com/vi/u6wOyMUs74I/hqdefault.jpg",
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: "Ed Sheeran",
              liveBroadcastContent: "none",
              publishTime: "2023-03-24T04:00:10Z",
            },
          },
          {
            kind: "youtube#searchResult",
            etag: "ia_KfVQbncIf8Dr49QuAVUb-viw",
            id: {
              kind: "youtube#video",
              videoId: "LAgou1mmGd8",
            },
            snippet: {
              publishedAt: "2023-03-24T06:53:05Z",
              channelId: "UCk35YdCoXoFSEEiU-MUeMAQ",
              title:
                "Top 40 Songs of 2022 2023 ⚡ Best English Songs ( Best Pop Music Playlist ) on Spotify ⚡ New Songs",
              description:
                "Top 100 Songs of 2023 ☘ Billboard Hot 100 This Week ☘ Best Pop Music Playlist on Spotify 2023 Thanks for watching the video, ...",
              thumbnails: {
                default: {
                  url: "https://i.ytimg.com/vi/LAgou1mmGd8/default.jpg",
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: "https://i.ytimg.com/vi/LAgou1mmGd8/mqdefault.jpg",
                  width: 320,
                  height: 180,
                },
                high: {
                  url: "https://i.ytimg.com/vi/LAgou1mmGd8/hqdefault.jpg",
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: "Pop internacional",
              liveBroadcastContent: "none",
              publishTime: "2023-03-24T06:53:05Z",
            },
          },
          {
            kind: "youtube#searchResult",
            etag: "IH_gj8rg1gqfPpa4ufB9xWaPR24",
            id: {
              kind: "youtube#video",
              videoId: "ueOGKkiVJm8",
            },
            snippet: {
              publishedAt: "2023-03-24T07:00:31Z",
              channelId: "UCEiS8m8OLFI0REntmsTvzjA",
              title:
                "FLYING OVER JAPAN (4K UHD) - Relaxing Music Along With Beautiful Nature Videos - 4K Video HD",
              description:
                "PIANO RELAX, MUSIC FOR YOUR SOUL --------------------------------------------- Follow Page Everywhere ➤Facebook ...",
              thumbnails: {
                default: {
                  url: "https://i.ytimg.com/vi/ueOGKkiVJm8/default.jpg",
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: "https://i.ytimg.com/vi/ueOGKkiVJm8/mqdefault.jpg",
                  width: 320,
                  height: 180,
                },
                high: {
                  url: "https://i.ytimg.com/vi/ueOGKkiVJm8/hqdefault.jpg",
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: "Piano Relaxing",
              liveBroadcastContent: "none",
              publishTime: "2023-03-24T07:00:31Z",
            },
          },
          {
            kind: "youtube#searchResult",
            etag: "Nw3QCd6iZVJdKwiXOk0O7c7L9rw",
            id: {
              kind: "youtube#video",
              videoId: "pJAXt1D68IE",
            },
            snippet: {
              publishedAt: "2020-05-15T05:48:12Z",
              channelId: "UCayzTot0bZq1U5NUNhvNDdQ",
              title: "Mood Music – 20 Soft Bollywood Instrumentals | Jukebox",
              description:
                "MoodMusic #BollywoodInstrumentals #StrummSound Set the mood with these wonderful instrumentals of some of the greatest ...",
              thumbnails: {
                default: {
                  url: "https://i.ytimg.com/vi/pJAXt1D68IE/default.jpg",
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: "https://i.ytimg.com/vi/pJAXt1D68IE/mqdefault.jpg",
                  width: 320,
                  height: 180,
                },
                high: {
                  url: "https://i.ytimg.com/vi/pJAXt1D68IE/hqdefault.jpg",
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: "Strumm Sound",
              liveBroadcastContent: "none",
              publishTime: "2020-05-15T05:48:12Z",
            },
          },
          {
            kind: "youtube#searchResult",
            etag: "JRh7WtldYbtA3SEtUlYpMSKC9WI",
            id: {
              kind: "youtube#video",
              videoId: "p1TmjUNxWY4",
            },
            snippet: {
              publishedAt: "2023-03-24T11:00:44Z",
              channelId: "UCa2pFBgiwFvH9XNCasfxHiw",
              title:
                "NONSTOP SLOW ROCK LOVE SONGS 80S 90S 🌺 MGA LUMANG TUGTUGIN NOONG 90S 🎤🎧Best Lumang Tugtugin🎧",
              description:
                'Chanel "Music hot" is a great channel for lovers of old music and love stories. This channel brings classical, romantic music with a ...',
              thumbnails: {
                default: {
                  url: "https://i.ytimg.com/vi/p1TmjUNxWY4/default.jpg",
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: "https://i.ytimg.com/vi/p1TmjUNxWY4/mqdefault.jpg",
                  width: 320,
                  height: 180,
                },
                high: {
                  url: "https://i.ytimg.com/vi/p1TmjUNxWY4/hqdefault.jpg",
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: "Music Hot",
              liveBroadcastContent: "none",
              publishTime: "2023-03-24T11:00:44Z",
            },
          },
        ],
      };

      return response;
    } catch (err: any) {
      console.error(
        `Error while fetching yt details: ${JSON.stringify(err?.message)}`
      );
    }
  }

  public static async setYoutubeVideoResponseInDatabase(response: any) {
    let listData: any[] = [];

    response?.["items"]?.map(async (data: any) => {
      let object = {
        title: this.removeSpecials(data?.["snippet"]?.["title"]),
        channelId: data?.["snippet"]?.["channelId"],
        channelTitle: data?.["snippet"]?.["channelTitle"],
        videoId: data?.["id"]?.["videoId"],
        description: data?.["snippet"]?.["description"],
        publishedAt: data?.["snippet"]?.["publishedAt"],
        thumbnails: JSON.stringify(data?.["snippet"]?.["thumbnails"]),
        publishTime: data?.["snippet"]?.["publishTime"],
      };
      listData.push(object);
    });

    await VideoHelper.saveDataInDatabase(listData);

    return {
      status: 200,
      message: "success",
    };
  }

  static async saveDataInDatabase(VideoObjectList: any[]) {
    try {
      VideoObjectList.forEach(async (VideoObject: any) => {
        await VideoQueries.VideoModelCreateQuery(VideoObject);
      });

      return null;
    } catch (error: any) {
      return {
        status: 400,
        message: "error while saving schema",
      };
    }
  }

  static paginateArrayByPageSizeAndNumber = (
    array: any[],
    page_size: number = 10,
    page_number: number
  ) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  public static getAllVideosByAnyKeyInDescOrder = async (
    pageNumber: number,
    sortByOrder: string = "desc",
    sortByKey: string = "publishTime",
    pageSize: number
  ) => {
    try {
      let response = await VideoQueries.VideoModelGetByAnyKeyInDescOrderQuery(
        sortByOrder
      );
      await this.sortVideosByAnyKeyInDescOrder(
        response,
        sortByOrder,
        sortByKey
      );
      response = this.paginateArrayByPageSizeAndNumber(
        response,
        pageSize,
        pageNumber
      );
      return response;
    } catch (error: any) {}
  };

  static sortVideosByAnyKeyInDescOrder = async (
    response: any[],
    sortOrder: string = "desc",
    sortByKey: string
  ) => {
    try {
      response?.sort((a, b) => {
        return sortOrder === "desc"
          ? Date.parse(b?.[sortByKey]) - Date.parse(a?.[sortByKey])
          : Date.parse(a?.[sortByKey]) - Date.parse(b?.[sortByKey]);
      });
      response?.map((data) => {
        data.thumbnails = JSON.parse(data?.thumbnails);
      });
      return response;
    } catch (error: any) {}
  };

  public static getAllVideosByTitleOrDescription = async (
    searchString: String,
    pageNumber: number,
    pageSize: number
  ) => {
    try {
      let response = await VideoQueries.VideoModelGetByTitleOrDescriptionQuery(
        searchString
      );
      response = this.paginateArrayByPageSizeAndNumber(
        response,
        pageSize,
        pageNumber
      );
      return response;
    } catch (error: any) {}
  };
}

module.exports = VideoHelper;
