export const timeAgo = blogPublished => {
  const publishedDate = new Date(blogPublished).toISOString().slice(0, 10);
  const currentDate = new Date().toISOString().slice(0, 10);

  const timeDifferenceInDays = Math.floor(
    (new Date(currentDate) - new Date(publishedDate)) / (1000 * 60 * 60 * 24),
  );

  if (timeDifferenceInDays === 0) {
    return 'today';
  } else if (timeDifferenceInDays === 1 || timeDifferenceInDays === -1) {
    return '1 day ago';
  } else {
    if (timeDifferenceInDays < 0) {
      return timeDifferenceInDays * -1 + ' days ago';
    } else {
      return timeDifferenceInDays * 1 + ' days ago';
    }
  }
};
