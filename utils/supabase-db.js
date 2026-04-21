const SUPABASE_URL = 'https://rhlcwmarzgewkmgzxipj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_58B5I1KVOpon5I9rgjlLWg_YZ3sOqRd';

// Map your app's requested table names to the new Supabase table names
const getTableName = (type) => {
  const map = {
    'member_application': 'member_applications',
    'user': 'app_users',
    'member': 'members',
    'admin_user': 'admin_users'
  };
  return map[type] || type;
};

// Map Supabase rows to the format your React app expects
const mapFromSupabase = (row) => ({
  objectId: row.id,
  objectData: row.object_data,
  createdAt: row.created_at
});

window.trickleListObjects = async function(type, limit = 100, fetchAll = true) {
  const table = getTableName(type);
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&limit=${limit}`, {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  
  if (!response.ok) {
    console.error(`Supabase GET ${table} failed:`, await response.text());
    throw new Error('Supabase GET failed');
  }
  
  const data = await response.json();
  return { items: data.map(mapFromSupabase) };
};

window.trickleCreateObject = async function(type, data) {
  const table = getTableName(type);
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ object_data: data })
  });
  
  if (!response.ok) {
    console.error(`Supabase POST ${table} failed:`, await response.text());
    throw new Error('Supabase POST failed');
  }
  
  const responseData = await response.json();
  return mapFromSupabase(responseData[0]);
};

window.trickleUpdateObject = async function(type, objectId, data) {
  const table = getTableName(type);
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${objectId}`, {
    method: 'PATCH',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ object_data: data })
  });
  
  if (!response.ok) {
    console.error(`Supabase PATCH ${table} failed:`, await response.text());
    throw new Error('Supabase PATCH failed');
  }
  
  const responseData = await response.json();
  return mapFromSupabase(responseData[0]);
};