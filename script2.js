'use strict'

document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById('search')
  const searchList = document.getElementById('searchList')
  const cardTemplate = document.getElementById('card')
  let matches;
  
  const debounce = (fn, debounceTime) => {
    let timer;
    return function (...args) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, debounceTime)
    }
  };
  
  const createTemplateCard = (template, data) => {
    const clone = template.content.cloneNode(true)
    const repName = clone.querySelectorAll('#repName')
    const repOwner = clone.querySelectorAll('#repOwner')
    const repStars = clone.querySelectorAll('#repStars')
    const closeBtn = clone.getElementById('closeBtn')
    
    const getOwner = (data.full_name).split('/')[0]
    
    repName[0].innerHTML = data.name
    repOwner[0].innerHTML = getOwner
    repStars[0].innerHTML = data.stargazers_count
    template.parentNode.appendChild(clone)
    
    closeBtn.addEventListener('click', (e) => {
      const card = e.target.parentNode.parentNode
      card.remove()
    })
  }
  
  const searchRepos = async searchText => {
    
    if (searchText) {
      const res = await fetch(`https://api.github.com/search/repositories?q=${searchText}&per_page=5`)
      const reposJson = await res.json()
      const repos = reposJson.items
      
      matches = repos.filter(repo => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        return repo.name.match(regex)
      })
      
    } else {
      matches = [];
    }
    outputHtml(matches)
  }
  
  const outputHtml = (matches) => {
    searchList.innerHTML = matches.map(match => {
      return `<li class="input-box__item">${match.full_name}</li>`
    }).join('')
  }
  
  searchList.addEventListener('click', (e) => {
    const cardInfo = matches.find(match => e.target.innerHTML === match.full_name)
    
    createTemplateCard(cardTemplate, cardInfo)
    
    searchList.innerHTML = ''
    search.value = ''
    search.focus()
  })
  
  
  search.addEventListener('input', debounce(() => searchRepos(search.value.trim()), 400))
})