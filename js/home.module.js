import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Game {
   constructor() {
      document.querySelectorAll('.menu a').forEach((link) => {
        link.addEventListener('click', () => {
         this.activeLink(link);
         const category = link.getAttribute("data-category")
         console.log(category);
         this.getGame(category)
          });
      });
      this.loading =document.querySelector(".loading");
      this.details = document.getElementById('details');
      this.games = document.getElementById('games');

      this.ui = new Ui();
      this.getGame("mmorpg")
      
    }
 async activeLink(link){
   document.querySelector(".menu .active").classList.remove("active");
   link.classList.add("active");
 
 }

async getGame(categoryName){
   this.loading.classList.remove("d-none");
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ce35fe67e6mshfe19d2ecdeab19fp13d859jsn18ab645c8227',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`,options);
    const data = await api.json();
    console.log(data);
    
   this.ui.displayData(data)
    this.loading.classList.add("d-none");

    document.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('click' , ()=>{
      this.details.classList.remove('d-none');
      this.games.classList.add('d-none');
      new Details(card.dataset.id);
      })
    })

}




}