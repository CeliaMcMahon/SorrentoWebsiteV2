// my object of images
const image1 = {
    file:"images/apartment_front.jpg",
    description: "The beautiful architecturally designed Sorrento apartments from the front",
    alt: "Picture shows the front of the Sorrento apartments surrounded by gardens"
};

const image2 = {
    file:"images/apartment_garden.jpg",
    description: "The relaxing gardens behind the apartments",
    alt: "Picture of a green garden in front of a glass window, which is at the back of the apartments at Sorrento by the Sea"
};

const image3 = {
    file:"images/apartment_bath.jpg",
    description: "A beautiful place to relax and have a bath in the comfort of your apartment",
    alt: "This is an image of a deep bath tub with a large window looking out onto a smamll palm planted garden outside"
};

const image4 = {
    file:"images/janusz-maniak-EhmVYJu6QSY-unsplash.jpg",
    description: "Remember, Sorrento by the Sea is pet friendly",
    alt: "Picture of a dog digging in the sand on the beach with the ocean in the background"
};

const image5 = {
    file:"images/jeremy-bishop-berPYMe_-yw-unsplash.jpg",
    description: "Enjoy a romantic getaway",
    alt: "Silhoutte photo of a couple kissing on the beach, in front of the ocean at sunset"
};

const images = [image1, image2, image3, image4, image5];

//grab the image tag from html
const slide = document.querySelector(".slide img");
const description = document.querySelector(".description");

//when the page loads call the slideshow function
window.addEventListener('load', showSlide);

//grab the html for the previous and the next
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

//create variable slideIndex that will increment or decrement to loop through the images
var slideIndex = 0;

//add the event listeners
next.addEventListener('click', ()=>{
    slideIndex++;
    showSlide();
})

prev.addEventListener('click', ()=>{
    slideIndex--;    
    showSlide();
})

/**
 * This function shows all slides by ensuring that if someone
 * clicks back from the first slide that it will still process
 * through the slide show, and if someone clicks beyond the last
 * slide in the slide show it will return to the start
 */
function showSlide(){
    if(slideIndex === images.length){
        slideIndex = 0;
    }

    if(slideIndex === -1){
        slideIndex = images.length - 1;
    }
    
    slide.src = images[slideIndex].file;
    description.innerHTML = images[slideIndex].description;
    slide.alt = images[slideIndex].alt;
}


// Date calculator section
// ---------------------------------------------------------

// select the html dates
const startDate = document.querySelector("#startDate");
const endDate = document.querySelector("#endDate");

// select the button
const calculateBtn = document.querySelector("#calculate");

const warning = document.querySelector("#warning");

// Date object
const today = new Date();

// create var to store date values
var startDateValue;
var endDateValue;

// event listener for start date value
startDate.addEventListener('input', () =>{
    startDateValue = new Date(startDate.value);
})

// event listener for end date value
endDate.addEventListener('input', () =>{
    endDateValue = new Date (endDate.value);
})

/**
 * Takes the start date and end date from the calendar
 * event listeners above and checks these to make sure
 * that they are after today's date and that the end date
 * is not before the start date.
 */
calculateBtn.addEventListener('click', ()=>{

    // array to store date
    var dates = []; 

    var day = startDateValue.getDate();
    var month = startDateValue.getMonth();
    var year = startDateValue.getFullYear();
    var indexDate = new Date(year, month, day);
    // date checks    
    // start date is before current date and end date is after today
    if (startDateValue <= today && endDateValue > today){
        warning.innerHTML="You need to select a start date after today";        
    }
    // start date AND end date are before current date
    else if (startDateValue <= today && endDateValue <= today){
        warning.innerHTML="You need to select a start date and end date after today";        
    }
    // end date is before current date and start date is after today (even though this could be
    // returned as "You need to stay at least one night", this is catering for just the end date)
    else if (endDateValue <= today){
        warning.innerHTML="You need to select an end date after today";
    }
    // when BOTH dates are after today but the end date is earlier than the start date
    else if (endDateValue <= startDateValue){
        warning.innerHTML="You need to stay at least one night";
    }
    // catch all warning if for some reason calculator does not work
    else{
        warning.innerHTML="Your quote will be processed now";

        // loop to get each date for calculating the total costs of the stay
        while(indexDate < endDateValue){
            let oneDay = {date: indexDate, cost: calculateCost(indexDate)};
            dates.push(oneDay);
            indexDate = new Date(year, month, ++day);
         }
        
        // remove last element so that you aren't taking into account the last day (leaving day)
        dates.pop();

        // write the loop to calculate the total cost
        var totalCost = 0;
         for (let i = 0; i < dates.length; i++){
             totalCost += dates[i].cost;
             warning.innerHTML=`Your quote is $${totalCost.toFixed(2)}`;
         }
    }
})

// range of dates
period1StartDate = new Date(2020, 08, 01); // 1st September
period1EndDate = new Date(2020, 11, 18); // 18th December
period2StartDate = new Date(2020, 11, 19); // 19th December
period2EndDate = new Date(2021, 0, 31) // 31st January
period3StartDate = new Date(2021, 01, 01); // 1st February
period3EndDate = new Date(2021, 04, 31); // 31st May
period4StartDate = new Date(2021, 05, 01); // 1st June
period4EndDate = new Date(2021, 07, 31); // 31st August

/**
 * Sets the cost for each specific date period to be used in 
 * conjunction with the calculate button add event listener * 
 * @param {*} date - date value passed to match each relevant price tier
 */
function calculateCost(date){
    periodDate = date.getDate();
    periodMonth = date.getMonth();
    periodYear = date.getFullYear();
    date = new Date(periodYear, periodMonth, periodDate)
    let cost;
    if (date >= period1StartDate && date <= period1EndDate){
        cost = 220        
    }
    else if (date >= period2StartDate && date <= period2EndDate){
        cost = 250
    }
    else if (date >= period3StartDate && date <= period3EndDate){
        cost = 220
    }
    else{
        cost = 200
    }
    return cost;
}
