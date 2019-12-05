import React, { useState, useEffect } from 'react';
import './App.css';

  var lift = 0
  var maxJump = 7
  var x=9
  var y=58
  var floor = 58
  var playerClass = "player right"
  var moving = null
  var modifier = 0
  var fall = 0
  var maxFall = 7
  var health = 20
  var pos = [0,58]
  var position = [0,58]
  var direction = "right"
  var progress = 0
  var activeItem = {name:"Candy Cane",className:"candy-cane",method:'candyCane'}
  var airborn = false
  var objects = []
  var itemLocations = [{name:"Gift",className:"gift",position: [142,30],method:'gift'}]
  var enemys = [{name: "snowman",position: [100,58],range:80,flip: 1,count: 0},{name: "snowman",position: [650,58],range:80,flip: 1,count: 0},{name: "snowman",position: [375,58],range:80,flip: 1,count: 0},{name: "snowman",position: [500,58],range:80,flip: 1,count: 0},{name: "gumdrop",position: [150,58],range:80,flip: 1,count: 0},{name: "gumdrop",position: [950,58],range:80,flip: 1,count: 0},{name: "gumdrop",position: [350,58],range:80,flip: 1,count: 0},{name: "gumdrop",position: [650,58],range:80,flip: 1,count: 0},{name: "ginger",position: [250,58],range:80,flip: 1,count: 0},{name: "ginger",position: [400,58],range:80,flip: 1,count: 0},{name: "ginger",position: [700,58],range:80,flip: 1,count: 0},]
  var platforms = [{name: "platform",position: [100,50]},{name: "platform",position: [101,50]},{name: "platform",position: [102,50]},{name: "platform",position: [103,50]},{name: "platform",position: [115,40]},{name: "platform",position: [114,40]},{name: "platform",position: [113,40]},{name: "platform",position: [112,40]},{name: "platform",position: [111,40]},{name: "platform",position: [110,40]},{name: "platform",position: [109,40]},{name: "platform",position: [108,40]},{name: "platform",position: [107,40]},{name: "platform",position: [128,25]},{name: "platform",position: [129,25]},{name: "platform",position: [130,25]},{name: "platform",position: [131,25]},{name: "platform",position: [132,25]},{name: "platform",position: [133,25]},{name: "platform",position: [134,25]},{name: "platform",position: [135,25]},{name: "platform",position: [136,25]},{name: "platform",position: [137,25]},{name: "platform",position: [138,25]},{name: "platform",position: [139,25]},{name: "platform",position: [140,25]},{name: "platform",position: [141,25]},{name: "platform",position: [142,25]},]
  var init = 0
  var snowfall = 0
  var snowfall2 = 0
  var flip = 1
  var inventory = [{name:"Candy Cane",className:"candy-cane",method:'candyCane'}]

  let vh = window.innerHeight * 0.01
  let vw = window.innerWidth * 0.01
  let aspect = vw/vh
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--vw', `${vh}pw`);



function App() {
  document.documentElement.style.setProperty('--life', `${health}vw`);

  flip*=-1
  if(init<=2) {
    playerClass = init===0?"player right jump":init===1?"player right run":"player right"
    init++
  }
  snowfall++
  snowfall2++
  snowfall%=385
  snowfall2%=730

  objects = objects.filter((enemy)=>{return enemy!==null})
  enemys = enemys.filter((enemy)=>{return enemy!==null})

  var snowmen = enemys.filter((enemy)=>{return enemy.name==="snowman"})
  snowmen = snowmen.map((enemy)=>{return <figure className='snowman' style={{left: enemy.position[0]+progress+modifier+"vw", top: 58*vh+"px", transform: enemy.flip===1? "rotateY(180deg)" : "rotateY(0deg)"}}></figure>})
  var gingers = enemys.filter((enemy)=>{return enemy.name==="ginger"})
  gingers = gingers.map((enemy)=>{return <figure className='ginger' style={{left: enemy.position[0]+progress+modifier+"vw", top: 58*vh+"px", transform: enemy.flip===1? "rotateY(180deg)" : "rotateY(0deg)"}}></figure>})
  var gumdrops = enemys.filter((enemy)=>{return enemy.name==="gumdrop"})
  gumdrops = gumdrops.map((enemy)=>{return <figure className='gumdrop' style={{left: enemy.position[0]+progress+modifier+"vw", top: 58*vh+"px"}}></figure>})

  useEffect(()=>{
    if(health===0){window.location.reload()}
    //console.log(action)
    // console.log(moving)
    itemLocations.forEach((location,index)=>{
      if( location.position[0] <= position[0] +2 && location.position[0] >= position[0] -1 && location.position[1] >= position[1] && location.position[1] <= position[1] +6 ) {
        handleItem(location,index)
      }
    })

    enemys.forEach((enemy,index)=>{
      if(enemy) {

        if(enemy.name==='gumdrop') {
          if( enemy.position[0] <= position[0] +2 && enemy.position[0] >= position[0] -1 && enemy.position[1] >= position[1] && enemy.position[1] <= position[1] +6 ) {
            pos=[pos[0]+moving==="right"?-1:1,pos[1]]
            moving==="right"?x--:x++
          }
        }


        if(enemy.name==='snowman'||enemy.name==='ginger') {
          enemys[index].position = [enemy.position[0]+.25*enemy.flip,enemy.position[1]]
          //enemys[index].position = enemy.name==='ginger'? ginger() : enemys[index].position         do this
          enemy.count++
          if(enemy.count===enemy.range) {
            enemy.flip*=-1
            enemy.count=0
          }
          if( enemy.position[0] <= position[0] +2 && enemy.position[0] >= position[0] -1 && enemy.position[1] >= position[1] && enemy.position[1] <= position[1] +6 ) {
            health-=1
          }

        objects.forEach((obj,ind)=>{
          if(obj) {
            if(obj.range<=5){objects[ind].position=[objects[ind].position[0],objects[ind].position[1]+.3]}
            if(obj.range<=0){objects[ind]=null}
            if (enemy.position[0]+modifier <= obj.position[0]-progress -1  && enemy.position[0]+modifier >= obj.position[0]-progress -4 && enemy.position[1] >= obj.position[1]&& enemy.position[1] <= obj.position[1] +6){//can use enemy.height / width
              enemys[index]=null
              objects[ind]=null
            }
           }
        })
      }
    }
  })

  let landed = platforms.filter((platform)=>{return platform.position[0]===position[0]&&platform.position[1]>=Math.floor(position[1]-13)})
  if(lift>0&&lift<=maxJump) {
    airborn = true
    y = y-7/lift
    modifier = x===10&&moving==='left'? modifier+1 : x===50&&moving==='right'? modifier-1 : modifier
    lift++
    lift=lift%maxJump
  }
  if(lift===0) {
    if(y<58){
      modifier = x===10&&moving==='left'? modifier+1 : x===50&&moving==='right'? modifier-1 : modifier
      if(landed.length>0){
        if (landed[0].position[1]>=y+.5) {
         landed = [] 
        } else {
          y=landed[0].position[1]
          fall=0
        }
      }
      landed = landed.length===1?true:false
      if(!landed){ y+=(.5*fall)<maxFall?.5*fall: maxFall}
      if(y>=58||landed){
        airborn = false
        if(y>=58){y=58}
        fall = 0
        lift = 0
        airborn = false
        if(moving==='jump'||moving===''){stop()} else {          
          playerClass = 'player run '
          playerClass += direction
        }
      }
      fall++
    }
  }
  if(moving==="right") {
    if(x<50){x++}
  } 
  if(moving==="left") {
    if(x>10){x--}
  } 
})

  setTimeout(()=>{
    if(pos[0]!==x||pos[1]!==y) {
      pos=[x,y]
    } else {
      if((x===50 || x===10)&&moving) {scroll()}
    }
    objects.forEach((object)=>{
      if(object){
        object.range--
        object.position[0] += object.direction==='left'?-2:2
      }
    })
    setAction(!action)
  },50)

 
  position=[x-progress-modifier,y]

const handleResize = () => {
    if( window.innerHeight>window.innerWidth&&!overlay) {
      setOverlay(
        <section className="overlay">
        <h2>Please rotate your screen</h2>
        </section>
        )
    } 
    if( window.innerHeight<window.innerWidth&&overlay) {
      setOverlay(null)
    }
  }

  const gingerMove = ()=>{

  }

  const left = () => {
    moving="left" 
    direction = "left"
    playerClass="player run left"
  }

  const right = () => {
    moving="right" 
    direction = "right"
    playerClass="player run right"
  }

  const stop = () => {
    playerClass = "player "+direction
    moving=''
  }

  const jump = () => {
    if (lift===0&&!airborn){
      playerClass = playerClass+=" jump"
      if(lift>=maxJump){ alert()} else {lift++}
      if(!moving) {
        moving="jump"
      }  
    }
  }

  const keyDown = (e) => {
    if(e.keyCode===13){active() }
    if(e.keyCode===32){jump() }
    if(e.keyCode===39){right() }
    if(e.keyCode===37){left() }  
    if(e.keyCode===38){ } //up
    if(e.keyCode===40){ }  //down
  }

const keyUp = (e) => {
    if(e.keyCode===32){jump() }
    if(e.keyCode===39) {
      moving=''
      stop()
    }
    if(e.keyCode===37) {
      moving=''
      stop()
    }
    if(e.keyCode===38){ } //up
    if(e.keyCode===40){ }  //down
  }

  const scroll = () => {
    progress = moving==="left"? progress+1 : moving==="right"?progress-1: progress
  }

  var candyCane = () => {
    objects.push({position:[pos[0],pos[1]-.5],direction:direction,range:20})
  }

  var gift = () => {
    alert()
    objects.push({position:[pos[0],pos[1]-.5],direction:direction,range:20})
  }

  const referenceFunction = (str) => {
    if(str==='gift'){alert();return gift()}
    if(str==='candyCane'){return candyCane()}  
  }

  const handleItem = (item,index) => {
    inventory.push({name: item.name,className: item.className,method: referenceFunction(item.name)})
    itemLocations.splice(index,1)
  }


  window.addEventListener('resize', handleResize);

  const [action, setAction] = useState(false)
  const [overlay, setOverlay] = useState(null)
  var items = inventory.map((item)=>{ return {name: item.name,className: item.className,method: referenceFunction(item.name)}})
  var active = () => {return referenceFunction(activeItem.method) }

  return (
    <div className="App" onLoad={handleResize()} onKeyDown={(e)=>{keyDown(e)}} onKeyUp={(e)=>{keyUp(e)}}> 
    <button className="button-left" onMouseDown={left} onMouseUp={stop} onTouchStart={left} onTouchEnd={stop}>
    </button>
    <div className="field" style={{backgroundPosition: (progress+modifier)*vw+"px"}} >

      <div className="screen bg" style={{backgroundPosition: progress+modifier+"vw "+snowfall2+"%"}}></div>
      <button className="screen" onTouchStart={jump} onMouseDown={jump} style={{backgroundPosition: progress+modifier+"vw "+snowfall*2+"%"}}>
      </button>
      <section className='health-bar' style={{width: health+'vw!important'}}></section>
      <section className={'action-box '+items.filter((item)=>{return item.name===activeItem.name})[0].className} onClick={active} style={{}}></section>
      <figure className={playerClass} style={{left: pos[0]*vw+'px', top: pos[1]*vh+'px'}}> 
      </figure>
      {snowmen.map((obj)=>{return obj})}
      {gumdrops.map((obj)=>{return obj})}
      {gingers.map((obj)=>{return obj})}
      {objects.map((obj)=>{return <div className={"active "+items.filter((item)=>{return item.name===activeItem.name})[0].className+"-missile"} style={objects[0]?{left: obj.position[0]+'vw', top: obj.position[1]+"vh"}:null}></div>})}
      {platforms.map((obj)=>{return <div className="platform" style={{left: obj.position[0]+progress+modifier+'vw', top: (obj.position[1]+11.5)*vh+"px"}}></div>})}
      {itemLocations.map((obj)=>{return <div className={"fieldItem "+obj.className} style={obj.position?{left: obj.position[0]+progress+modifier+'vw', top: obj.position[1]+"vh"}:null}></div>})}
    </div>
    <button className="button-right" onMouseDown={right} onMouseUp={stop} onTouchStart={right} onTouchEnd={stop}>
    </button>
    <section className="menu">
    {items.map((item)=>{return <div className={"item "+item.className} onClick={()=>{activeItem.name=item.name}}></div>})}
    </section>
    {overlay} 
    <div className="blinder"></div>
    </div>
  );
}

export default App;
