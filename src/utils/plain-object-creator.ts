export const withStringId = <T extends { _id?: any }>(doc: T): T & { _id?: string } => {
     if (!doc || typeof doc !== 'object') return doc as any;
     const id = (doc as any)._id;
     return id && typeof id === 'object' && typeof id.toString === 'function'
          ? ({ ...(doc as any), _id: id.toString() })
          : (doc as any);
};