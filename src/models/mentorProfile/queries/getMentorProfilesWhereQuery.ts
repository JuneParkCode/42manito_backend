export function getMentorProfilesWhereQuery(hashtagId?: number, categoryId?: number) {
  const whereObject = {};
  if (hashtagId !== undefined) {
    whereObject['hashtags'] = {
      some: {
        id: hashtagId,
      },
    };
  }
  if (categoryId !== undefined) {
    whereObject['categories'] = {
      some: {
        id: categoryId,
      },
    };
  }

  return whereObject;
}

export function getMentorProfileRevealsWhereQuery(hashtagId?: number, categoryId?: number) {
  const whereObject = { isHide: false };
  if (hashtagId !== undefined) {
    whereObject['hashtags'] = {
      some: {
        id: hashtagId,
      },
    };
  }
  if (categoryId !== undefined) {
    whereObject['categories'] = {
      some: {
        id: categoryId,
      },
    };
  }

  return whereObject;
}

export function getMentorProfilesSearchWhereQuery(
  searchHashtag: boolean,
  searchNickname: boolean,
  search: string,
) {
  const orArray = [];
  const whereObject = { OR: orArray };
  if (searchHashtag) {
    const hashtagWhereObject = {};
    hashtagWhereObject['hashtags'] = {
      some: {
        name: {
          contains: search,
        },
      },
    };
    orArray.push(hashtagWhereObject);
  }
  if (searchNickname) {
    const userWhereObject = {};
    userWhereObject['user'] = {
      nickname: {
        contains: search,
      },
    };
    orArray.push(userWhereObject);
  }
  return whereObject;
}
