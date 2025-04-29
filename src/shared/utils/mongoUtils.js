export const convertDocToObj = (doc) => {
  if (!doc) return null;

  const obj = doc.toObject ? doc.toObject() : doc;

  return {
    ...obj,
    _id: obj._id?.toString(),
    createdAt: obj.createdAt?.toISOString(),
    updatedAt: obj.updatedAt?.toISOString()
  };
};

export const convertDocsToObjs = (docs) => {
  return docs.map(doc => convertDocToObj(doc));
};
