window.WELLMAX_SUPABASE = {
  url: 'https://ihlqzqejmitfwdyanhcy.supabase.co',
  publishableKey: 'sb_publishable_ahmVIjzdxB7JZan_osXyCA_UPfO8aVd'
};

if (window.supabase && !window.WELLMAX_SUPABASE_CLIENT) {
  window.WELLMAX_SUPABASE_CLIENT = window.supabase.createClient(
    window.WELLMAX_SUPABASE.url,
    window.WELLMAX_SUPABASE.publishableKey,
    { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
  );
}
