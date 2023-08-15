class StarRater extends HTMLElement {

  constructor() {
    super();
    this.main();
  }

  main() {
    const shadow = this.attachShadow({mode: "open"});
    shadow.appendChild(this.styles())

    const rater = this.createRater();
    this.stars = this.createStars();
    this.stars.forEach(star => rater.appendChild(star));

    shadow.appendChild(rater)
  }

  createRater() {
    const rater = document.createElement('div');
    rater.classList.add('star-rater-container');
    return rater;
  }

  createStars() {
    const createStar = (_, idx) => {
      const star = document.createElement('span');
      star.classList.add('star');
      star.setAttribute('data-value', Number(idx) + 1);
      star.innerHTML = '&#9733;';

      star.addEventListener('click', this.setRating.bind(this))
      star.addEventListener('mouseover', this.ratingHover.bind(this))
      star.addEventListener('mouseleave', this.hoverLeave.bind(this))

      return star;
    }
    return Array.from({length: 5}, createStar);
  }

  setRating(event) {
    this.setAttribute('data-rating', event.currentTarget.getAttribute('data-value'));

    this.stars.forEach(star => {
      if ((star.getAttribute('data-value')) <= this.currentRatingValue) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  ratingHover(event) {
    this.currentRatingValue = event.currentTarget.getAttribute('data-value');
    this.highLightRating();
  }

  highLightRating() {
    this.stars.forEach(star => {
      if ((star.getAttribute('data-value')) <= this.currentRatingValue) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  hoverLeave(event) {
    const dataRating = this.getAttribute('data-rating');
    this.stars.forEach(star => {
      if (star.getAttribute('data-value') <= dataRating) {
        star.classList.add('active');
      } 
      else {
        star.classList.remove('active');
      }
    });
  }

  styles() {
    const style = document.createElement('style');
    style.textContent = `
      .star-rater-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        font-size: 5rem;
        gap: 0.75rem
      }
      .star {
        cursor: pointer;
        color: gray;
      }
      .active {
        color: yellow;
      }
    `;
    return style;
  }
  
}

customElements.define('star-rater', StarRater);
