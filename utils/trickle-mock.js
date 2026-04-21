// Mock implementation of Trickle database functions using localStorage for local testing
window.trickleListObjects = async function(type, limit, fetchAll) {
  const data = JSON.parse(localStorage.getItem('trickle_mock_' + type) || '[]');
  return { items: data.slice(0, limit || 100) };
};

window.trickleCreateObject = async function(type, data) {
  const db = JSON.parse(localStorage.getItem('trickle_mock_' + type) || '[]');
  const newObj = {
    objectId: 'obj_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    objectData: data,
    createdAt: new Date().toISOString()
  };
  db.push(newObj);
  localStorage.setItem('trickle_mock_' + type, JSON.stringify(db));
  return newObj;
};

window.trickleUpdateObject = async function(type, objectId, data) {
  const db = JSON.parse(localStorage.getItem('trickle_mock_' + type) || '[]');
  const index = db.findIndex(item => item.objectId === objectId);
  if (index !== -1) {
    db[index].objectData = { ...db[index].objectData, ...data };
    localStorage.setItem('trickle_mock_' + type, JSON.stringify(db));
    return db[index];
  }
  throw new Error("Object not found");
};
