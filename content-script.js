function replaceViewCount (article) {
  const analytics = article.querySelector('a[href$="analytics"]');
  const viewCount = analytics?.ariaLabel?.match(/^\d+/)?.[0];

  if (viewCount) {
    const like = article.querySelector('[data-testid="like"]');
    const likeCount = like?.ariaLabel?.match(/^\d+/)?.[0];
  
    const ppm = Math.round(likeCount * 10000 / viewCount);
  
    const analyticsValueSpan = analytics.querySelector("div > div > span > span");

    if (!isNaN(ppm)) {
      analyticsValueSpan.innerText =  ppm + " ppm";
    }
  }
}

const mutationObserver = new MutationObserver((mutationRecords) => {
  mutationRecords.forEach((mutationRecord) => {
    const articles = mutationRecord.target.querySelectorAll('article');

    for (let article of articles) {
      replaceViewCount(article);
    }
  })
});

mutationObserver.observe(
  document.body,
  { childList: true, subtree: true }
);
