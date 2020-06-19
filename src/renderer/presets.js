const presets = {
  'Facebook': {
    url: 'https://www.facebook.com/',
    iconUrl: 'https://1.bp.blogspot.com/-XiLOdfhlkWM/VQLP0EKDrVI/AAAAAAAAXwM/tvzCwhKdxw4/s1600/F_icon.svg.png'
  },

  'Messenger': {
    url: 'https://www.messenger.com/',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Facebook_Messenger_4_Logo.svg/1200px-Facebook_Messenger_4_Logo.svg.png'
  },

  'Twitter': {
    url: 'https://twitter.com',
    iconUrl: 'https://raphahw.com/wp-content/uploads/2016/08/Twittericon.png'
  },

  'Youtube': {
    url: 'https://www.youtube.com/',
    iconUrl: 'https://maxcdn.icons8.com/Share/icon/Media_Controls/youtube_play1600.png'
  },

  'Instagram': {
    url: 'https://www.instagram.com/',
    iconUrl: 'https://www.freepnglogos.com/uploads/instagram-logos-png-images-free-download-2.png'
  },

  'Reddit': {
    url: 'https://www.reddit.com/',
    iconUrl: 'http://www.vectorico.com/download/social_media/Reddit-Icon.png'
  },

  'Twitch': {
    url: 'https://www.twitch.tv/',
    iconUrl: 'https://socialman.net/imgs/landing/twitch-giveaway-app.png'
  },

  'LinkedIn': {
    url: 'https://www.linkedin.com/',
    iconUrl: 'https://1000logos.net/wp-content/uploads/2017/03/LinkedIn-Logo-500x500.png'
  },

  'Soundcloud': {
    url: 'https://soundcloud.com/',
    iconUrl: 'http://icons.iconarchive.com/icons/xenatt/minimalism/256/App-SoundCloud-icon.png'
  },

  'Vimeo': {
    url: 'https://vimeo.com/',
    iconUrl: 'http://icons.iconarchive.com/icons/sicons/basic-round-social/512/vimeo-icon.png'
  },

  'Gmail': {
    url: 'https://mail.google.com/mail',
    iconUrl: 'https://maxcdn.icons8.com/Share/icon/color/Logos/gmail1600.png'
  },

  'Coinbase': {
    url: 'https://www.coinbase.com/',
    iconUrl: 'https://i0.wp.com/paywithink.com/wp-content/uploads/2018/09/icon-512px-1.png?w=1080&ssl=1'
  },

  'Stack-Overflow': {
    url: 'https://stackoverflow.com/',
    iconUrl: 'https://www.daskeyboard.com/images/applets/stack-overflow/icon.png'
  },

  'GitHub': {
    url: 'https://github.com/',
    iconUrl: 'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/276/full/github_logo.png'
  },

  'Bitbucket': {
    url: 'https://bitbucket.org/',
    iconUrl: 'https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/bitbucket-512.png'
  },

  'Firebase': {
    url: 'https://firebase.google.com/',
    iconUrl: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.stickpng.com%2Fassets%2Fthumbs%2F5847f40ecef1014c0b5e488a.png'
  },

  'Behance': {
    url: 'https://www.behance.net/',
    iconUrl: 'https://cdn.icon-icons.com/icons2/840/PNG/512/Behance_icon-icons.com_66898.png'
  },

  'Dribbble': {
    url: 'https://dribbble.com/',
    iconUrl: 'https://cdn.freebiesupply.com/logos/large/2x/dribbble-icon-1-logo-png-transparent.png'
  },

  'NY-Times': {
    url: 'https://www.nytimes.com',
    iconUrl: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ffiles.softicons.com%2Fdownload%2Fsystem-icons%2Fwindows-8-metro-invert-icons-by-dakirby309%2Fpng%2F256x256%2FInternet%2520Shortcuts%2520%26%2520Manufacturers%2FThe%2520New%2520York%2520Times%2520alt.png'
  },

  'Rolling-Stone': {
    url: 'https://www.rollingstone.com/',
    iconUrl: 'https://1000logos.net/wp-content/uploads/2017/05/Rolling-Stones-logo-432x500.png'
  }
}

const lib = {
  getPreset (name) {
    if (!name || typeof name !== 'string') { return {} }
    return presets[name]
  }
}

module.exports = lib
