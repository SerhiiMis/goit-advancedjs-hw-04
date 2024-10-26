import{a as $,i as p,S as P}from"./assets/vendor-BGz2EIcA.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&t(u)}).observe(document,{childList:!0,subtree:!0});function o(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(e){if(e.ep)return;e.ep=!0;const a=o(e);fetch(e.href,a)}})();const S=VITE_API_KEY,T="https://pixabay.com/api/",b={key:S,orientation:"horizontal",image_type:"photo",safesearch:!0,per_page:15};async function y(r,s=1){var o,t;try{const e=E(r),a=`${T}?q=${e}&page=${s}&${new URLSearchParams(b)}`;return(await $.get(a)).data}catch(e){throw console.error("Error fetching images:",e),new Error(`Error fetching images with status ${(o=e.response)==null?void 0:o.status} and response ${((t=e.response)==null?void 0:t.statusText)||""}`)}}function E(r){const s=r.split(/\s+/);let o="";for(const t of s){if((o+"+"+t).length>100)break;o+=(o?"+":"")+t}return o}const g=3e3,w="topRight";function l(r){p.warning({message:r,timeout:g,position:w,close:!1})}function I(r){p.error({message:r,timeout:g,position:w,close:!1})}function L(r,s=!1){if(r.length===0){I("Sorry, there are no images matching your search query. Please try again!");return}const o=r.map(t=>`<li class="gallery-item">
  <a class="gallery-link" href="${t.largeImageURL}">
    <img
      class="gallery-image"
      src="${t.webformatURL}"
      alt="${t.tags}"
      data-likes="${t.likes}"
      data-views="${t.views}"
      data-comments="${t.comments}"
      data-downloads="${t.downloads}"
    />
  </a>
  <ul class="stats">
    <li class="stats-item">
      <p class="stats-item-header">Likes</p>
      <p class="stats-item-value">${t.likes}</p>
    </li>
    <li class="stats-item">
      <p class="stats-item-header">Views</p>
      <p class="stats-item-value">${t.views}</p>
    </li>
    <li class="stats-item">
      <p class="stats-item-header">Comments</p>
      <p class="stats-item-value">${t.comments}</p>
    </li>
    <li class="stats-item">
      <p class="stats-item-header">Downloads</p>
      <p class="stats-item-value">${t.downloads}</p>
    </li>
  </ul>
</li>`).join("");s?f.insertAdjacentHTML("beforeend",o):f.innerHTML=o}const m=document.querySelector(".action-form"),c=document.getElementById("load-more"),n=document.querySelector(".loader"),f=document.querySelector(".gallery");let i=1,h="",d=0;m.addEventListener("submit",O);c.addEventListener("click",q);async function O(r){if(r.preventDefault(),h=m.elements.query.value.trim(),i=1,!h)return l("Please enter a valid query!");f.innerHTML="",c.classList.add("is-hidden"),n.classList.remove("is-hidden");try{const s=await y(h,i);d=s.totalHits,console.log("Total hits:",d),L(s.hits,!1),n.classList.add("is-hidden"),v.refresh(),s.hits.length>0&&d>15?c.classList.remove("is-hidden"):c.classList.add("is-hidden"),s.hits.length||l("We're sorry, but no results were found.")}catch(s){console.error(s),n.classList.add("is-hidden"),l("Sorry, something went wrong. Please try again!")}finally{m.reset()}}async function q(){i++,n.classList.remove("is-hidden");try{const r=await y(h,i);L(r.hits,!0),n.classList.add("is-hidden"),v.refresh(),console.log(`Current Page: ${i}, Total Hits: ${d}`),i*15>=d&&(c.classList.add("is-hidden"),l("You've reached the end of the search results."));const{height:s}=f.firstElementChild.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}catch(r){console.error(r),n.classList.add("is-hidden"),l("Unable to load more images. Please try again later.")}}let v=new P(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=index.js.map
