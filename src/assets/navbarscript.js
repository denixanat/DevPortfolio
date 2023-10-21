

const carouselText = [
	{text: "visión", color: "white"},
	{text: "código", color: "white"},
	{text: "portafolio", color: "white"}
  ]
  
  $( document ).ready(async function() {
	carousel(carouselText, "#feature-text")
  });
  
  async function typeSentence(sentence, eleRef, delay = 100) {
	const letters = sentence.split("");
	let i = 0;
	while(i < letters.length) {
	  await waitForMs(delay);
	  $(eleRef).append(letters[i]);
	  i++
	}
	return;
  }
  
  async function deleteSentence(eleRef) {
	const sentence = $(eleRef).html();
	const letters = sentence.split("");
	let i = 0;
	while(letters.length > 0) {
	  await waitForMs(100);
	  letters.pop();
	  $(eleRef).html(letters.join(""));
	}
  }
  
  async function carousel(carouselList, eleRef) {
	  var i = 0;
	  while(true) {
		updateFontColor(eleRef, carouselList[i].color)
		await typeSentence(carouselList[i].text, eleRef);
		await waitForMs(1500);
		await deleteSentence(eleRef);
		await waitForMs(500);
		i++
		if(i >= carouselList.length) {i = 0;}
	  }
  }
  
  function updateFontColor(eleRef, color) {
	$(eleRef).css('color', color);
  }
  
  function waitForMs(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
  }
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

});

! function(d) {
  var c = "portfilter";
  var b = function(e) {
      this.$element = d(e);
      this.stuff = d("[data-tag]");
      this.target = this.$element.data("target") || ""
  };
  b.prototype.filter = function(g) {
      var e = [],
          f = this.target;
      this.stuff.fadeOut("fast").promise().done(function() {
          d(this).each(function() {
              if (d(this).data("tag") == f || f == "all") {
                  e.push(this)
              }
          });
          d(e).show()
      })
  };
  var a = d.fn[c];
  d.fn[c] = function(e) {
      return this.each(function() {
          var g = d(this),
              f = g.data(c);
          if (!f) {
              g.data(c, (f = new b(this)))
          }
          if (e == "filter") {
              f.filter()
          }
      })
  };
  d.fn[c].defaults = {};
  d.fn[c].Constructor = b;
  d.fn[c].noConflict = function() {
      d.fn[c] = a;
      return this
  };
  d(document).on("click.portfilter.data-api", "[data-toggle^=portfilter]", function(f) {
      d(this).portfilter("filter")
  })
}(window.jQuery);