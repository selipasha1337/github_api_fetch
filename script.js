// 'use strict'
//
// document.addEventListener("DOMContentLoaded", () => {
//   const search = document.getElementById('search')
//   const searchList = document.getElementById('searchList')
//   const cardTemplate = document.getElementById('card')
//
//   const debounce = (fn, debounceTime) => {
//     let timer;
//     return function (...args) {
//       clearTimeout(timer)
//       timer = setTimeout(() => {
//         fn.apply(this, args)
//       }, debounceTime)
//     }
//   };
//
//   const searchRepos = async searchText => {
//     let matches;
//
//     if (searchText) {
//       const res = await fetch(`https://api.github.com/search/repositories?q=${searchText}&per_page=5`)
//       const reposJson = await res.json()
//       const repos = reposJson.items
//
//       matches = repos.filter(repo => {
//         const regex = new RegExp(`^${searchText}`, 'gi')
//         return repo.name.match(regex) || repo.full_name.match(regex)
//       })
//
//     } else {
//       matches = [];
//     }
//
//     outputHtml(matches)
//
//   }
//
//   const outputHtml = (matches) => {
//     searchList.innerHTML = matches.map(match => {
//       return `<li class="input-box__item">${match.name}</li>`
//     }).join('')
//
//     searchList.addEventListener('click', (e) => {
//       for (const match of matches) {
//         if (match.name === e.target.innerHTML) {
//           const clone = cardTemplate.content.cloneNode(true)
//           const repName = clone.querySelectorAll('#repName')
//           const repOwner = clone.querySelectorAll('#repOwner')
//           const repStars = clone.querySelectorAll('#repStars')
//           const closeBtn = clone.getElementById('closeBtn')
//
//           const getOwner = (match.full_name).split('/')[0]
//
//           repName[0].innerHTML = match.name
//           repOwner[0].innerHTML = getOwner
//           repStars[0].innerHTML = match.stargazers_count
//           cardTemplate.parentNode.appendChild(clone)
//           search.value = ''
//           search.focus()
//
//           closeBtn.addEventListener('click', (e) => {
//             const card = e.target.parentNode.parentNode
//             card.remove()
//           })
//           break;
//         }
//       }
//
//       searchList.innerHTML = ''
//     })
//
//   }
//
//   search.addEventListener('input', debounce(() => searchRepos(search.value.trim()), 400))
// })
