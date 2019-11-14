import React, { useState, useEffect } from 'react';
import './App.css';

  var lift = 0
  var maxJump = 20
  var x=9
  var y=54
  var floor = 54
  var playerClass = "player stand-right"
  var moving = null
  var modifier = 0
  var fall = 0
  var maxFall = 5
  var health = 20
  var pos = [0,54]
  var position = [0,54]
  var direction = "right"
  var progress = 0
  var activeItem = "Candy Cane"
  var objects = []
  var obstacles = [{name: "snowman",position: [100,54],range:80,flip: 1,count: 0},{name: "snowman",position: [250,54],range:80,flip: 1,count: 0},{name: "snowman",position: [375,54],range:80,flip: 1,count: 0},{name: "snowman",position: [500,54],range:80,flip: 1,count: 0}]

function App() {
  objects = objects.filter((obstacle)=>{return obstacle!==null})
  obstacles = obstacles.filter((obstacle)=>{return obstacle!==null})
  var snowmen = obstacles.map((obstacle)=>{return <figure className='snowman' style={{left: obstacle.position[0]+progress+modifier+"vw", top: "54vh", transform: obstacle.flip===1? "rotateY(180deg)" : "rotateY(0deg)"}}></figure>})

  useEffect(()=>{
    if(health===0){window.location.reload()}
    console.log(progress)
    //console.log(action)
    // console.log(moving)
    obstacles.forEach((obstacle,index)=>{
      if(obstacle) {
        obstacles[index].position = [obstacle.position[0]+.25*obstacle.flip,obstacle.position[1]]
        obstacle.count++
      if(obstacle.count===obstacle.range) {
        obstacle.flip*=-1
        obstacle.count=0
      }
      if( obstacle.position[0] <= position[0] +2 && obstacle.position[0] >= position[0] -1 && obstacle.position[1] >= position[1] && obstacle.position[1] <= position[1] +6 ) {
        health-=1
      }
      objects.forEach((obj,index)=>{
        if(obj) {
          if(obj.range<=5){objects[index].position=[objects[index].position[0],objects[index].position[1]+.3]}
          if(obj.range<=0){objects[index]=null}
          if (obstacle.position[0]+modifier <= obj.position[0]-progress  && obstacle.position[0]+modifier >= obj.position[0]-progress -1 && obstacle.position[1] >= obj.position[1]&& obstacle.position[1] <= obj.position[1] +6){//can use obstacle.height / width
            obstacles[index]=null
            objects[index]=null
          }
         }
      })
    }
  })

  if(lift>0&&lift<=maxJump) {
    y = y-5/lift
    modifier = x===10&&moving==='left'? modifier+1 : x===50&&moving==='right'? modifier-1 : modifier
    lift++
    lift=lift%15
  }
  if(lift===0) {
    if(y<54){
      modifier = x===10&&moving==='left'? modifier+1 : x===50&&moving==='right'? modifier-1 : modifier
      y+=(.04*fall)<maxFall?.04*fall: maxFall

      if(y>=54){
        y=54
        if(moving==='jump'){stop()}
        playerClass = playerClass==="player jump-left"? "player run-left" : playerClass==="player jump-right"?"player run-right" : "player stand-right"
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

  const left = () => {
    moving="left" 
    direction = "left"
    playerClass="player run-left"
  }

  const right = () => {
    moving="right" 
    direction = "right"
    playerClass="player run-right"
  }

  const stop = () => {
    playerClass = moving==='left'? 'player stand-left' : 'player stand-right'
    moving=null
  }

  const jump = () => {
    playerClass = playerClass==="player run-left"? "player jump-left" : "player jump-right"

    if(lift===maxJump){ lift = 0} else {lift++}
    if(!moving) {
      moving="jump"
    }  
  }

  const scroll = () => {
    progress = moving==="left"? progress+1 : moving==="right"?progress-1: progress
  }

  var candyCane = () => {
    objects.push({position:[pos[0],pos[1]-.5],direction:direction,range:20})
  }

  window.addEventListener('resize', handleResize);

  const [items, setItems] = useState([{name:"Candy Cane",className:"candy-cane",method:candyCane}])
  const [action, setAction] = useState(false)
  const [overlay, setOverlay] = useState(null)

  return (
    <div className="App" onLoad={handleResize()} >
    <button className="button-left" onMouseDown={left} onMouseUp={stop} onTouchStart={left} onTouchEnd={stop}>
    </button>
    <div className="field" style={{backgroundPosition: progress+modifier+"vw"}}>
      <div className="mask" onTouchStart={jump} onMouseDown={jump}>
      </div>
      <section className='health-bar' style={{width: health+'vw'}}></section>
      <section className={'action-box '+items.filter((item)=>{return item.name===activeItem})[0].className} onClick={items.filter((item)=>{return item.name===activeItem})[0].method} style={{}}></section>
      <figure className={playerClass} style={{left: pos[0]+'vw', top: pos[1]+"vh"}}> 
      </figure>
      {snowmen.map((obj)=>{return obj})}
      {objects.map((obj)=>{return <div className="active candy-cane-missile" style={objects[0]?{left: obj.position[0]+'vw', top: obj.position[1]+"vh"}:null}></div>})}
    </div>
    <button className="button-right" onMouseDown={right} onMouseUp={stop} onTouchStart={right} onTouchEnd={stop}>
    </button>
    <section className="menu">
    {items.map((item)=>{return <div className={"item "+item.className} onClick={()=>{activeItem=item.name}}></div>})}
    </section>
    {overlay}
    </div>
  );
}

export default App;
