import { c as createComponent } from './astro-component_BggQPHv2.mjs';
import 'piccolore';
import { Q as renderTemplate, B as maybeRenderHead, a3 as addAttribute } from './sequence_bpEQWQ1D.mjs';
import { r as renderComponent } from './entrypoint_CsMLnXWo.mjs';
import { $ as $$BaseLayout, r as renderScript } from './BaseLayout_g37VBgAI.mjs';

const prerender = false;
const $$Profile = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Profile;
  const { lang } = Astro2.params;
  const text = lang === "en" ? {
    title: "My Profile",
    loading: "Loading profile...",
    status: "Subscription Status",
    active: "Bloom Brief Subscriber",
    role: "Account Privilege",
    signOut: "Sign Out",
    errorTitle: "Access Denied",
    errorBody: "You need to be logged in to view your profile.",
    loginBtn: "Go to Login",
    adminPanel: "Go to Admin Dashboard",
    welcome: "Welcome back",
    deleteData: "Unsubscribe",
    modalTitle: "Are you sure you want to unsubscribe?",
    modalBody1: "This action will:",
    modalBullet1: "Remove your email from our mailing list.",
    modalBullet2: "Permanently delete your profile and account data.",
    modalBullet3: "Sign you out of your current session.",
    modalFooter: "This cannot be undone. Do you wish to proceed?",
    modalCancel: "Cancel",
    modalConfirm: "Yes, Unsubscribe"
  } : {
    title: "የእኔ መለያ",
    loading: "መገለጫ በማምጣት ላይ...",
    status: "የደንበኝነት ምዝገባ",
    active: "Bloom Brief ደንበኛ",
    role: "የመለያ ሚና",
    signOut: "ውጣ",
    errorTitle: "መዳረሻ ተከልክሏል",
    errorBody: "መገለጫዎን ለማየት መግባት አለብዎት።",
    loginBtn: "ወደ መግቢያ ይሂዱ",
    adminPanel: "ወደ አስተዳዳሪ ዳሽቦርድ ይሂዱ",
    welcome: "እንኳን በደህና መጡ",
    deleteData: "ምዝገባ ሰርዝ",
    modalTitle: "እርግጠኛ ነዎት ምዝገባዎን መሰረዝ ይፈልጋሉ?",
    modalBody1: "ይህ እርምጃ፡",
    modalBullet1: "ኢሜይልዎን ከዝርዝራችን ያስወግዳል።",
    modalBullet2: "የመለያዎን መረጃ ሙሉ በሙሉ ይሰርዛል።",
    modalBullet3: "አሁን ካሉበት ክፍለ ጊዜ ያወጣዎታል።",
    modalFooter: "ይህ እርምጃ ሊቀለበስ አይችልም። መቀጠል ይፈልጋሉ?",
    modalCancel: "ሰርዝ",
    modalConfirm: "አዎ፣ ሰርዝ"
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "lang": lang, "title": `${text.title} | Bloom Brief` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-gray-50 min-h-[70vh] py-16 flex justify-center items-start px-4"> <!-- Loading State --> <div id="profile-loading" class="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center"> <div class="inline-block w-12 h-12 border-4 border-[#003366]/20 border-t-[#003366] rounded-full animate-spin mb-4"></div> <p class="text-gray-500 font-medium">${text.loading}</p> </div> <!-- Error / Logged Out State --> <div id="profile-error" class="hidden w-full max-w-xl bg-white rounded-2xl shadow-sm border border-red-100 p-12 text-center"> <div class="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6"> <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> </div> <h2 class="text-2xl font-heading font-extrabold text-gray-900 mb-2">${text.errorTitle}</h2> <p class="text-gray-600 mb-8">${text.errorBody}</p> <a${addAttribute(`/${lang}/login`, "href")} class="inline-block bg-[#003366] text-white font-bold py-3 px-8 rounded hover:bg-[#002244] transition"> ${text.loginBtn} </a> </div> <!-- Authenticated Profile Card --> <div id="profile-card" class="hidden w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"> <!-- Profile Header --> <div class="bg-[#003366] p-8 md:p-10 text-white flex flex-col md:flex-row items-center md:items-start gap-6"> <div id="avatar-circle" class="w-24 h-24 rounded-full bg-white text-[#003366] flex items-center justify-center text-4xl font-extrabold border-4 border-white/20 shadow-lg">
U
</div> <div class="text-center md:text-left mt-2"> <p class="text-blue-200 text-sm font-medium uppercase tracking-widest mb-1">${text.welcome}</p> <h1 id="user-email-display" class="text-2xl md:text-3xl font-heading font-extrabold truncate max-w-[300px] md:max-w-md" title="">
user@example.com
</h1> </div> </div> <!-- Profile Details --> <div class="p-8 md:p-10"> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"> <!-- Property 1 --> <div> <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">${text.status}</p> <div class="flex items-center text-gray-900 font-semibold bg-gray-50 px-4 py-3 rounded border border-gray-100"> <span class="w-3 h-3 rounded-full bg-[#1B4332] mr-3"></span> ${text.active} </div> </div> <!-- Property 2 --> <div> <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">${text.role}</p> <div class="flex items-center text-gray-900 font-semibold bg-gray-50 px-4 py-3 rounded border border-gray-100" id="role-container"> <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> <span id="role-text">Standard Reader</span> </div> </div> </div> <!-- Action Area --> <div class="flex flex-col sm:flex-row flex-wrap gap-4 border-t border-gray-100 pt-8" id="profile-actions"> <button id="profile-sign-out" class="w-full sm:w-auto px-6 py-3 border border-gray-200 text-gray-700 font-bold rounded hover:bg-gray-50 transition-colors flex items-center justify-center"> <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> ${text.signOut} </button> <button id="profile-delete" class="w-full sm:w-auto px-6 py-3 border border-red-100 text-red-600 font-bold rounded hover:bg-red-50 transition-colors flex items-center justify-center"> <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> ${text.deleteData} </button> <a id="admin-dashboard-link" href="/admin" class="hidden w-full sm:w-auto px-6 py-3 bg-[#003366] text-white font-bold rounded hover:bg-[#002244] transition-colors flex items-center justify-center"> <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> ${text.adminPanel} </a> </div> </div> </div> <!-- Custom Unsubscribe Modal --> <div id="unsubscribe-modal" class="fixed inset-0 z-[100] hidden"> <!-- Backdrop --> <div id="modal-backdrop" class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity opacity-0 duration-200"></div> <!-- Modal Content --> <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0"> <div id="modal-panel" class="relative bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:max-w-lg sm:w-full border border-gray-100 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 duration-200"> <div class="bg-white px-6 pt-6 pb-6"> <div class="sm:flex sm:items-start"> <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-50 sm:mx-0 sm:h-10 sm:w-10"> <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path> </svg> </div> <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"> <h3 class="text-xl font-heading font-extrabold text-gray-900"> ${text.modalTitle} </h3> <div class="mt-3 text-sm text-gray-600 space-y-3"> <p class="font-bold text-gray-800">${text.modalBody1}</p> <ul class="list-disc pl-5 space-y-1.5 text-gray-500 font-medium"> <li>${text.modalBullet1}</li> <li>${text.modalBullet2}</li> <li>${text.modalBullet3}</li> </ul> <p class="font-bold text-gray-800 pt-2">${text.modalFooter}</p> </div> </div> </div> </div> <div class="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row-reverse gap-3 border-t border-gray-100"> <button type="button" id="modal-confirm-btn" class="w-full inline-flex justify-center items-center rounded border border-transparent shadow-sm px-6 py-2.5 text-base font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none sm:w-auto sm:text-sm transition-colors"> <span id="modal-confirm-text">${text.modalConfirm}</span> </button> <button type="button" id="modal-cancel-btn" class="w-full inline-flex justify-center items-center rounded border border-gray-300 shadow-sm px-6 py-2.5 bg-white text-base font-bold text-gray-700 hover:bg-gray-50 focus:outline-none sm:w-auto sm:text-sm transition-colors cursor-pointer"> ${text.modalCancel} </button> </div> </div> </div> </div> </div> ` })} ${renderScript($$result, "C:/Users/User/Desktop/Blog/src/pages/[lang]/profile.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/User/Desktop/Blog/src/pages/[lang]/profile.astro", void 0);

const $$file = "C:/Users/User/Desktop/Blog/src/pages/[lang]/profile.astro";
const $$url = "/[lang]/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Profile,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
