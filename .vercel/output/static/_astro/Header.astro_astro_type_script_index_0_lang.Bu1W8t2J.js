import{s as n}from"./supabase.DsSyOdee.js";async function r(){const t=document.getElementById("auth-status-container");if(!t)return;const{data:{user:o}}=await n.auth.getUser(),e=window.location.pathname.startsWith("/am")?"am":"en",s=e==="en"?"Log In":"ግቡ",i=e==="en"?"My Account":"የእኔ መለያ",a=e==="en"?"Sign Out":"ውጣ";if(o){const l=o.email?o.email.charAt(0).toUpperCase():"U";t.innerHTML=`
        <button id="profile-dropdown-btn" class="w-9 h-9 rounded-full bg-[#003366] text-white font-bold flex items-center justify-center border-2 border-white shadow-sm hover:shadow transition-shadow focus:outline-none focus:ring-2 focus:ring-[#003366]/30">
          ${l}
        </button>
        <!-- Dropdown menu -->
        <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div class="px-4 py-2 border-b border-gray-100">
            <p class="text-xs text-gray-500 font-medium">Signed in as</p>
            <p class="text-sm text-gray-900 font-bold truncate">${o.email}</p>
          </div>
          <a href="/${e}/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            ${i}
          </a>
          <button id="sign-out-btn" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center font-medium">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            ${a}
          </button>
        </div>
      `,setTimeout(()=>{document.getElementById("sign-out-btn")?.addEventListener("click",async()=>{await n.auth.signOut(),window.location.href=`/${e}/`})},0)}else t.innerHTML=`
        <a href="/login" class="inline-flex items-center justify-center px-5 py-2 text-sm font-bold text-white bg-[#003366] hover:bg-[#002244] border border-transparent rounded shadow-sm transition-colors cursor-pointer">
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          ${s}
        </a>
      `}r();n.auth.onAuthStateChange(t=>{(t==="SIGNED_IN"||t==="SIGNED_OUT")&&r()});
