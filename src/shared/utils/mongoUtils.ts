export const convertDocToObj = (doc: any) => {
    if (!doc) return null;
    
    const obj = doc.toObject ? doc.toObject() : doc;
    
    return {
      ...obj,
      _id: obj._id?.toString(),
      createdAt: obj.createdAt?.toISOString(),
      updatedAt: obj.updatedAt?.toISOString()
    };
  };
  
  export const convertDocsToObjs = (docs: any[]) => {
    return docs.map(doc => convertDocToObj(doc));
  };