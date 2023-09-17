const { createClient } = require('@supabase/supabase-js');
const config = require('./config');

const supabaseUrl = config.supabase.url;
const supabaseKey = config.supabase.apiKey;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
