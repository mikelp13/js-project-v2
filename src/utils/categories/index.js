import { data } from "../../data/data"

const createCategoryMarkup = (title, russianTitle) =>{
  return `<li class="filter-item item" data-category="${title}">
  <a href="#" class="filter-item-btn orange">
      <span class="magic-span orange"></span>
      <span class="magic-span orange"></span>
      <span class="magic-span orange"></span>
      <span class="magic-span orange"></span>
      ${russianTitle}</a>
</li>`
}

export const createCategoriesMarkup = () => {
return data.calls.categories.reduce((acc, item, i)=>{
  acc+= createCategoryMarkup(item, data.calls.russianCategories[i])
  return acc
}, '')

} 