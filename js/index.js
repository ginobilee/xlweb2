//if show the first screen
var fSShow = true;
var details = document.querySelector('#details')
var navUl = document.querySelector('#navUl')
var scrollObj = {}
scrollObj.offsetTops = {}
scrollObj.intervalId = 0
scrollObj.slides=[]
initiateOffsetTops();

document.addEventListener('mousewheel',function(e){
	var scrollDown = e.deltaY>0?true:false
	if(scrollDown && fSShow){
		details.classList.remove('slideBottom')
		details.classList.add('slideTop')
		details.focus()
		fSShow = false
		return 
	}
    if(!fSShow && details.scrollTop === 0 && !scrollDown){
    	details.classList.remove('slideTop')
    	details.classList.add('slideBottom')
    	fSShow = true
    	return
    }
},false);

navUl.addEventListener('click',function(e){
	e.preventDefault()
	var liId = e.target.getAttribute('href')
	var liClicked = document.querySelector(liId)
	if(!scrollObj.intervalId){
		scrollObj.slides.push({stop:scrollObj.offsetTops[liId.slice(1)]})
	}
	smoothSlide(details)
},false)

function initiateOffsetTops(){
	var cNodes = Array.prototype.slice.call(details.childNodes)
	var eles = cNodes.filter(function(item){
		return item.nodeType ===1 && item.tagName.toLowerCase() === 'section'
	})
	var id
	for(var i=0,n=eles.length;i<n;i++){
		id = eles[i].getAttribute('id')
		scrollObj.offsetTops[id] = eles[i].offsetTop
	}
}
function smoothSlide(ele){
	if(!!scrollObj.slides.length){
		//ele.scrollTop = scrollObj.slides[0].stop
		if(!scrollObj.intervalId){
			var stop = scrollObj.slides[0].stop,start = ele.scrollTop
			var increment = stop>start?50:-50,counter=0
			intervalId = window.setInterval(function(){
				ele.scrollTop += increment
				counter++
				if(counter === Math.floor(Math.abs(start-stop)/50)){
					ele.scrollTop = stop
					clearInterval(intervalId)
					intervalId = 0
					scrollObj.slides.shift()
					if(!!scrollObj.slides.length){
						smoothSlide(ele)
					}
				}
		    },10)
		}
	}
}