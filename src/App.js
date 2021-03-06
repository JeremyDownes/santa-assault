import React, { useState, useEffect } from 'react';
import './App.css';
import platforms from './resources/collections/platforms.js'
import enemies from './resources/collections/enemys.js'
import randomEnemies from './resources/collections/randomEnemys.js'
import walls from './resources/collections/walls.js'
import itemLocations from './resources/collections/items.js'

  var lift = 0
  var maxJump = 7
  var x=9
  var y=58
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
  var snowballs = []
  var enemys = enemies
  var init = 0
  var snowfall = 0
  var snowfall2 = 0
  var flip = 1
  var inventory = [{name:"Candy Cane",className:"candy-cane",method:'candyCane'}]
  var falling = false
  var hit = ''
  var letters = 0
  var sleigh = false
  var throwCount = 0
  var modals= window.innerWidth>1080? [<div className='splash-screen'></div>,<div className='instruction-modal'><p className='modal-text'>The Naughty Children of the World have teamed up with some Disgruntled Elves and ran off with all the children's letters to Santa...</p><button onClick = {()=>{modals.splice(0,1)}}>Next&nbsp;&nbsp;&nbsp;></button></div>,  <div className='instruction-modal'><p className='modal-text'>They used their Elf Magic to bring Snowmen, Toys, and Treats to life and summoned Sugar Plumb Fairies to defend them...</p><button onClick = {()=>{modals.splice(0,1)}}>Next&nbsp;&nbsp;&nbsp;></button></div>, <div className='instruction-modal'><p className='modal-text'>Help Santa to collect all the letters so he can deliver presents to the Good Children of the World!</p><button onClick = {()=>{modals.splice(0,1)}}>Next&nbsp;&nbsp;&nbsp;></button></div>, <div className='instruction-modal screen-demo desktop'><p className='modal-text'>Click on the screen. Then use the arrow keys to move Santa around. Use SPACEBAR to jump.</p><button onClick = {()=>{modals.splice(0,1)}}>Next&nbsp;&nbsp;&nbsp;></button></div>, <div className='instruction-modal screen-demo desktop'><p className='modal-text'>Press ENTER to use the Active Item. Select the active item by clicking on an inventory item below.</p><button onClick = {()=>{modals.splice(0,1)}}>Next&nbsp;&nbsp;&nbsp;></button></div>,  <div className='instruction-modal screen-demo demo-3'><p className='modal-text'>Some items work better on some characters than others.</p><button onClick = {()=>{modals.splice(0,1)}}>Next&nbsp;&nbsp;&nbsp;></button></div>,  <div className='instruction-modal'><p className='modal-text'>Some letters may be hidden, while others may be held by a character.</p><button onClick = {()=>{modals.splice(0,1)}}>Next&nbsp;&nbsp;&nbsp;></button></div>, <div className='instruction-modal'><p className='modal-text'>Once you have collected enough letters, find Santa's sleigh to complete the mission.</p><button onClick = {()=>{modals.splice(0,1)}}>Next&nbsp;&nbsp;&nbsp;></button></div>, <div className='instruction-modal'><p className='modal-text'>Watch out for Black Ice and try not to get stuck in the Giant Gumdrops!</p><button onClick = {()=>{modals.splice(0,1)}}>Next&nbsp;&nbsp;&nbsp;></button></div>,] : [<div className='instruction-modal'><p className='modal-text'>The Naughty Children of the World have teamed up with some Disgruntled Elves and ran off with all the children's letters to Santa...</p><button onClick = {()=>{modals.splice(0,1)}}>Next&nbsp;&nbsp;&nbsp;></button></div>,  <div className='instruction-modal'><p className='modal-text'>They used their Elf Magic to bring Snowmen, Toys, and Treats to life and summoned Sugar Plumb Fairies to defend them...</p><button onClick = {()=>{modals.splice(0,1)}}>Next&nbsp;&nbsp;&nbsp;></button></div>,  <div className='instruction-modal'><p className='modal-text'>Help Santa to collect all the letters so he can deliver presents to the Good Children of the World!</p><button onClick = {()=>{modals.splice(0,1)}}>Next&nbsp;&nbsp;&nbsp;></button></div>, <div className='instruction-modal screen-demo demo-1'><p className='modal-text'>Use the arrows to move Santa around. Tap the screen to jump.</p><button onClick = {()=>{modals.splice(0,1)}}>Next&nbsp;&nbsp;&nbsp;></button></div>, <div className='instruction-modal screen-demo demo-2'><p className='modal-text'>Tap the action box to use the Active Item. Select the Active Item by tapping on an Inventory Item below.</p><button onClick = {()=>{modals.splice(0,1)}}>Next&nbsp;&nbsp;&nbsp;></button></div>,  <div className='instruction-modal screen-demo demo-3'><p className='modal-text'>Some items work better on some characters than others.</p><button onClick = {()=>{modals.splice(0,1)}}>Next&nbsp;&nbsp;&nbsp;></button></div>,  <div className='instruction-modal'><p className='modal-text'>Some letters may be hidden, while others may be held by a character.</p><button onClick = {()=>{modals.splice(0,1)}}>Next&nbsp;&nbsp;&nbsp;></button></div>, <div className='instruction-modal'><p className='modal-text'>Once you have collected enough letters, find Santa's sleigh to complete the mission.</p><button onClick = {()=>{modals.splice(0,1)}}>Next&nbsp;&nbsp;&nbsp;></button></div>, <div className='instruction-modal'><p className='modal-text'>Watch out for Black Ice and try not to get stuck in the Giant Gumdrops!</p><button onClick = {()=>{modals.splice(0,1)}}>Next&nbsp;&nbsp;&nbsp;></button></div>,]

  let vh = window.innerHeight * 0.01
  let vw = window.innerWidth * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--vw', `${vh}pw`);
  let isActive = false



function App() {

  document.documentElement.style.setProperty('--life', `${health}vw`);
  let platformRender = platforms.filter((platform)=>{return Math.abs(platform[0]-position[0])<80})
  let wallsRender = walls.filter((wall)=>{return Math.abs(wall[0]-position[0])<80})
  let itemLocationsRender = itemLocations.filter((item)=>{return Math.abs(item.position[0]-position[0])<80})
  //hit = ''

  flip*=-1
  if(init<=2) {
    playerClass = init===0?"player right jump":init===1?"player right run":"player right"
    init++
    if(init===1) {
      setTimeout(()=>{modals.splice(0,1)},3000)
    }
  }
  snowfall++
  snowfall2++
  snowfall%=385
  snowfall2%=730

  objects = objects.filter((enemy)=>{return enemy!==null})
  if(snowballs){snowballs = snowballs.filter((enemy)=>{return enemy!==null})}else{snowballs=[]}
  enemys = enemys.filter((enemy)=>{return enemy!==null}) 

  var snowmen = enemys.filter((enemy)=>{return enemy.name==="snowman"&&Math.abs(enemy.position[0]-position[0])<80})
  snowmen = snowmen.map((enemy)=>{return <figure className='snowman' style={{left: enemy.position[0]+progress+modifier+"vw", top: enemy.position[1]*vh+"px", transform: enemy.flip===1? "rotateY(180deg)" : "rotateY(0deg)"}}></figure>})  
  var fairies = enemys.filter((enemy)=>{return enemy.name==="fairy"&&Math.abs(enemy.position[0]-position[0])<80})
  fairies = fairies.map((enemy)=>{return <figure className='fairy' style={{left: enemy.position[0]+progress+modifier+"vw", top: enemy.position[1]*vh+"px", transform: enemy.flip===1? "rotateY(180deg)" : "rotateY(0deg)"}}></figure>})
  var elves = enemys.filter((enemy)=>{return enemy.name==="elf"&&Math.abs(enemy.position[0]-position[0])<80})
  elves = elves.map((enemy)=>{return <figure className='elf' style={{left: enemy.position[0]+progress+modifier+"vw", top: enemy.position[1]*vh+"px", transform: enemy.flip===1? "rotateY(180deg)" : "rotateY(0deg)"}}></figure>})
  var toys = enemys.filter((enemy)=>{return enemy.name==="toy"&&Math.abs(enemy.position[0]-position[0])<80})
  toys = toys.map((enemy)=>{return <figure className='toy' style={{left: enemy.position[0]+progress+modifier+"vw", top: enemy.position[1]*vh+"px", transform: enemy.flip===1? "rotateY(180deg)" : "rotateY(0deg)"}}></figure>})
  var gingers = enemys.filter((enemy)=>{return enemy.name==="ginger"&&Math.abs(enemy.position[0]-position[0])<80})
  gingers = gingers.map((enemy)=>{return <figure className='ginger' style={{left: enemy.position[0]+progress+modifier+"vw", top: enemy.position[1]*vh+"px", transform: enemy.flip===1? "rotateY(180deg)" : "rotateY(0deg)"}}></figure>})
  var badKids = enemys.filter((enemy)=>{return enemy.name==="badKid"&&Math.abs(enemy.position[0]-position[0])<80})
  badKids = badKids.map((enemy)=>{return <figure className={'badKid '+enemy.direction } style={{left: enemy.position[0]+progress+modifier+"vw", top: enemy.position[1]*vh+"px", }}></figure>})
  var gumdrops = enemys.filter((enemy)=>{return enemy.name==="gumdrop"&&Math.abs(enemy.position[0]-position[0])<80})
  gumdrops = gumdrops.map((enemy)=>{return <figure className='gumdrop' style={{left: enemy.position[0]+progress+modifier+"vw", top: enemy.position[1]*vh+"px"}}></figure>})
  var blackIces = enemys.filter((enemy)=>{return enemy.name==="blackIce"&&Math.abs(enemy.position[0]-position[0])<80})
  blackIces = blackIces.map((enemy)=>{return <figure className='black-ice' style={{left: enemy.position[0]+progress+modifier+"vw", top: enemy.position[1]*vh+"px"}}></figure>})

  useEffect(()=>{
    if(health<=0){
      modals.unshift(<div className='instruction-modal'><p className='modal-text'>You failed to save Christmas<br/><br/>Game Over</p></div>)
      setTimeout(()=>{window.location.reload()},3000)
    }

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


        if(enemy.name==='elf') {
          enemys[index]=elfMove(enemy)
        }

        if(enemy.name==='badKid') {       
          enemy.count++
          if( enemy.count===24) {
            enemy.direction = enemy.position[0]+progress+modifier+2 >= pos[0] ? "left" : "right"
            snowballs.push({position:[enemy.position[0]+progress+modifier,enemy.position[1]-.5],direction:enemy.direction,range:20})
          }
          enemy.count%=28
        } 

        if(enemy.name==='blackIce') {
          if( enemy.position[0] <= position[0] +2 && enemy.position[0] >= position[0] -1 && enemy.position[1] >= position[1] +10 && enemy.position[1] <= position[1] + 11 ) {
              stop()
              enemys[index].count++
            if(!falling&&moving!=='jump'){
              health-=1
              falling=true
              if(enemy.count>=3){falling=false;enemys[index]=null;playerClass=playerClass.replace(' falling','')}
            }
          }
          else {
            //falling = false
          }
        }

        if(enemy.name!=='gumdrop'&&enemy.name!=='blackIce') {
          if(enemy.name==='snowman'||enemy.name==='ginger'||enemy.name==='fairy'||enemy.name==='elf'||enemy.name==='toy') {
          if(enemy.name!=='elf'){enemys[index].position = [enemy.position[0]+.25*enemy.flip,enemy.position[1]]}
          if(enemy.name==='ginger'||enemy.name==='fairy'||enemy.name==='toy') {
            enemys[index]=eval(enemy.name+"Move(enemy)")
          }
          //enemys[index].position = enemy.name==='ginger'? ginger() : enemys[index].position         do this
          enemy.count++
          if(enemy.count===enemy.range) {
            enemy.flip*=-1
            enemy.count=0
          }
          if( enemy.position[0] <= position[0] +2 && enemy.position[0] >= position[0] -1 && enemy.position[1] >= position[1] && enemy.position[1] <= position[1] +8 ) {
            health-=enemy.damage
            hit='hit'
          }
        }

        objects.forEach((obj,ind)=>{
          if(obj) {
            if(obj.range<=5){objects[ind].position=[objects[ind].position[0],objects[ind].position[1]+.3]}
            if(obj.range<=0){objects[ind]=null}
            if (enemy.position[0]+modifier <= obj.position[0]-progress  && enemy.position[0]+modifier >= obj.position[0]-progress -2 && enemy.position[1] >= obj.position[1]&& enemy.position[1] <= obj.position[1] +6){//can use enemy.height / width
              enemy.health-=obj.damage
              objects[ind]=null
              if(enemy.name==='badKid'&&obj.itemClassName==='gift') {enemys[index].health=0}
              if(enemy.name==='badKid'&&obj.itemClassName==='coal') {enemys[index].health-=40}  
              if(enemy.name==='toy'&&obj.itemClassName==='nut') {enemys[index].health-=10}  
              if(enemy.name==='fairy'&&obj.itemClassName==='coke') {enemys[index].health-=20}
              if(enemy.name==='fairy'&&obj.itemClassName==='candy-cane') {enemys[index].health-=5}
              if(enemy.name==='ginger'&&obj.itemClassName==='coke') {enemys[index].health-=4}
              if(enemy.name==='ginger'&&obj.itemClassName==='candy-cane') {enemys[index].health-=3}
              if(enemy.name==='ginger'&&obj.itemClassName==='nut') {enemys[index].health-=2}
              if(enemy.name==='snowman'&&obj.itemClassName==='salt') {enemys[index].health=0}    
              if(enemy.health<=0){
                if(enemys[index].drop) {
                  enemys[index].drop.position=[enemy.position[0],enemy.position[1]+6]
                  itemLocations.push(enemys[index].drop)
                }
                enemys[index]=null}
            }
           }
        })

        if(snowballs){snowballs.forEach((obj,ind)=>{
          if(obj) {
            if(obj.range<=5){if(snowballs[ind]){obj.position=[obj.position[0],obj.position[1]+.3]}}
            if(obj.range<=0){snowballs.splice(ind,1);if(snowballs){snowballs = snowballs.filter((enemy)=>{return enemy!==null})}else{snowballs=[]};return }
            if (pos[0] <= obj.position[0] -1  && pos[0] >= obj.position[0] -4 && position[1] >= obj.position[1] && position[1] <= obj.position[1] +6){//can use enemy.height / width
              health-=1
              hit='snowhit'
              snowballs.splice(ind,1)
              setTimeout(()=>{hit=''},200)
            }
           }
        })}
      }
    }
  })

  let landed = platforms.filter((platform)=>{return platform[0]===position[0]&&platform[1]>=Math.floor(position[1]-11)})

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
        if (landed[0][1]>=y+.5) {
         landed = [] 
        } else {
          y=landed[0][1]
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

  if(hit==='hit') {
    let stillHit = enemys.filter((enemy)=>{return enemy? enemy.position[0] <= position[0] +2 && enemy.position[0] >= position[0] -1 && enemy.position[1] >= position[1] && enemy.position[1] <= position[1] +8 : null})
    if(stillHit.length<1){hit = ''}
  }
})

  setTimeout(()=>{
    if(pos[0]!==x||pos[1]!==y) {
      pos=[x,y]
    } else {
      if((x===50 || x===10)&&moving) {scroll()}
    }

    if(snowballs) {
    snowballs.forEach((snowball)=>{
      if(snowball){
        snowball.range--
        snowball.position[0] += snowball.direction==='left'?-2:2
      }
    })}
    objects.forEach((object)=>{
      if(object){
        object.range--
        object.position[0] += object.direction==='left'?-2:2
      }
    })
    setAction(!action)
  },50)
let onWall = false
 walls.forEach(wall=>{ if(Math.abs(wall[0]-position[0])<3 && position[1]+6 > wall[1] && position[1] < wall[1] ) {if(!onWall){x-=direction==="left"?-1:1;onWall=true;}}})
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
      window.location.reload()
    }
  }

  const elfMove = (elf) => {
    let dir = elf.position[0]<position[0]? 1 : -1
    elf.flip = elf.position[0]<position[0]? 1 : -1
    if(Math.abs(elf.position[0]-position[0])<65) {
      if(!walls.some((wall)=>{return wall[0]===elf.position[0]+dir && wall[1]===elf.position[1] })) {

      elf.position[0]+=dir/2
      }
    }
    return elf
  }


  const toyMove = (toy)=>{
    if(toy.count%8>3){
      if(toy.count%4===0){toy.position[1]+=.25}
    } else {
      if(toy.count%4===0){toy.position[1]-=.25}
    }
    return toy
  }

  const gingerMove = (ginger)=>{
    if(ginger.count>15&&ginger.count<20) {
      ginger.position[1]-=.5
    }
    if(ginger.count>20&&ginger.count<25) {
      ginger.position[1]+=.5
    }
    if(ginger.count>45&&ginger.count<50) {
      ginger.position[1]-=.5
    }
    if(ginger.count>50&&ginger.count<55) {
      ginger.position[1]+=.5
    }
    if(ginger.count>65&&ginger.count<70) {
      ginger.position[1]-=.5
    }
    if(ginger.count>70&&ginger.count<75) {
      ginger.position[1]+=.5
    }
    return ginger
  }

  const fairyMove = (fairy)=>{
    if(fairy.count>0&&fairy.count<25) {
      fairy.position[1]-=.5
    }
    if(fairy.count>25&&fairy.count<50) {
      fairy.position[1]+=.5
    }
    if(fairy.count>50&&fairy.count<75) {
      fairy.position[1]+=1
    }
    if(fairy.count>75&&fairy.count<100) {
      fairy.position[1]-=1
    }
    if(fairy.count>100&&fairy.count<125) {
      fairy.position[1]-=.35
    }
    if(fairy.count>125&&fairy.count<150) {
      fairy.position[1]+=.35
    }
    if(fairy.count>150&&fairy.count<175) {
      fairy.position[1]+=.75
    }
    if(fairy.count>175&&fairy.count<200) {
      fairy.position[1]-=.75
    }
    return fairy
  }

  const left = () => {
    if(!playerClass.includes('falling')) {
      moving="left" 
      direction = "left"
      playerClass="player run left"
    } else {
      moving = ''
    }
  }

  const right = () => {
    if(!playerClass.includes('falling')) {    
      moving="right" 
      direction = "right"
      playerClass="player run right"
      } else {
      moving = ''
    }
  }

  const stop = () => {
    if(!falling){ playerClass = "player "+direction }
    moving=''
  }

  const jump = () => {
    falling = false 
    if (lift===0&&!airborn){
      playerClass = playerClass.replace(' falling','')
      playerClass = playerClass+=" jump"
      if(lift>=maxJump){ alert()} else {lift++}
      if(!moving) {
        moving="jump"
      }  
    }
  }

  const keyDown = (e) => {
    if(e.keyCode===13){if(!isActive){active()} }
    if(e.keyCode===32){jump() }
    if(e.keyCode===39){right() }
    if(e.keyCode===37){left() }  
    if(e.keyCode===38){ } //up
    if(e.keyCode===40){ }  //down
  }

const keyUp = (e) => {
    if(e.keyCode===13){if(isActive){isActive=false; playerClass=playerClass.replace(' throw')} }
    if(e.keyCode===32){}
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
    walls.forEach(wall=>{ 
      if(Math.abs(position[0]-wall[0])<3&& position[1]+6 > wall[1] && position[1] < wall[1] ) {
        moving=''
      }
    })
  }

  var candyCane = () => {
    objects.push({damage: 1, itemClassName: 'candy-cane', position:[pos[0],pos[1]-.5],direction:direction,range:20})
  }

  var gift = () => {
    objects.push({damage: 0, itemClassName: 'gift', position:[pos[0],pos[1]-.5],direction:direction,range:30})
    decrementActiveItem('Gift')
  }

  var coal = () => {
    objects.push({damage: 4, itemClassName: 'coal', position:[pos[0],pos[1]-.5],direction:direction,range:25})
    decrementActiveItem('Coal')    
  }

  var coke = () => {
    objects.push({damage: 3, itemClassName: 'coke', position:[pos[0],pos[1]-.5],direction:direction,range:25})
    decrementActiveItem('Coke')
  }

  var salt = () => {
    objects.push({damage: 2, itemClassName: 'salt', position:[pos[0],pos[1]-.5],direction:direction,range:25})
    decrementActiveItem('Salt')    
  }

  var nuts = () => {
    objects.push({damage: 2, itemClassName: 'nut', position:[pos[0],pos[1]-.5],direction:direction,range:25})
    decrementActiveItem('Nuts')    
  }

  const decrementActiveItem = (name) => {
    let itmNdx = inventory.findIndex(itm=>itm.name===name)
    inventory[itmNdx].count=inventory[itmNdx].count-1
    activeItem.count--
    if( activeItem.count <= 0) {
      inventory=inventory.filter(item=>{return item.name!==name})
      activeItem={name:"Candy Cane",className:"candy-cane",method:'candyCane'}
    }
  }

  const handleItem = (item,index) => {
    let addItems = false
    if(item.name==='Cookies') {
      health+=5
    } else {
      if(item.name==='Letter') {
        if(item.message){alert(item.message)}
        letters++
      } else {  
        inventory.forEach((inv,index)=>{
          if(inv.name===item.name){
            inventory[index].count=inventory[index].count+item.count
            if(activeItem.name===item.name){activeItem.count+=item.count}
            addItems=true  
          }
        })
        if(!addItems){inventory.push({name: item.name,className: item.className,method: item.method, count: item.count})}
      }
    }
    itemLocations.splice(index,1)
  }

  window.addEventListener('resize', handleResize);

  const [action, setAction] = useState(false)
  const [overlay, setOverlay] = useState(null)
  var items = inventory.map((item)=>{ return {name: item.name,className: item.className,method: item.method, count: item.count}})
  var active = () => {if(!playerClass.includes('run')){playerClass+=' throw'}; isActive=true; eval(activeItem.method+'()')}

  playerClass = playerClass.replace(' falling','')
  playerClass += falling? ' falling' : ''
  if(falling){playerClass = playerClass.replace(' run','')}

  if(position[0]>1500) {
    let chance = Math.random()
    if (chance>.98) {
      let newEnemy = randomEnemies[Math.floor(Math.random()*13)]
      if(newEnemy) {
        newEnemy.position[0]=position[0]+80
        enemys.push(newEnemy)
      }
    }
  }

  if(letters>=12&&!sleigh) {
    modals.unshift(<div className='instruction-modal'><p className='modal-text'>You've collected enough letters. Get to the sleigh!</p><button onClick = {()=>{modals.splice(0,1)}}>OK</button></div>)
    sleigh=true
  }

  if(sleigh&&position[0]===160&&position[1]===58) {
    modals.unshift(<div className='instruction-modal final'><img className='sleigh-final' src='sleigh_santa.png'/><p className='modal-text'>You saved Christmas! Santa and the Good Children thank you.</p><p className='modal-text'>Play Again?</p><div className='button-container'> <button onClick = {()=>{window.location.reload()}}>Yes</button><button className='no' onClick = {()=>{window.location.href='https://celsiusmarketing.com'}}>No</button></div></div>)
  }

  if(isActive&&throwCount<=8) {
    throwCount++
  }


  if(throwCount===8) {
    throwCount=0
    isActive=false
    playerClass=playerClass.replace(' throw','')
  }
    
  return (
    <div className="App" onLoad={handleResize()} onKeyDown={(e)=>{keyDown(e)}} onKeyUp={(e)=>{keyUp(e)}}> 
    <button className="button-left" onMouseDown={left} onMouseUp={stop} onTouchStart={left} onTouchEnd={stop}>
    </button>
    <div className="field" style={{backgroundPosition: (progress+modifier)*vw+"px"}} >

      <div className="screen bg" style={{backgroundPosition: progress+modifier+"vw "+snowfall2+"%"}}></div>
      <button className="screen" onTouchStart={jump} onMouseDown={jump} style={{backgroundPosition: progress+modifier+"vw "+snowfall*2+"%"}}>
      </button>
      <section className='health-bar' style={{width: health+'vw!important'}}></section>
      <section className={'action-box '+activeItem.className} onClick={active}>{activeItem.count? 'x '+activeItem.count:null}</section>
      <section className='mailbox'><img src='letter.png'/><span>{' x '+letters}</span></section>
      <figure className={playerClass} style={{left: pos[0]*vw+'px', top: pos[1]*vh+'px'}}>
      <div className={hit}></div>
      </figure>
      {sleigh? <div className='sleigh' style={{left:170+progress+modifier+'vw'}}></div>: null}
      {snowmen.map((obj)=>{return obj})}
      {gumdrops.map((obj)=>{return obj})}
      {blackIces.map((obj)=>{return obj})}
      {gingers.map((obj)=>{return obj})}
      {fairies.map((obj)=>{return obj})}
      {elves.map((obj)=>{return obj})}
      {toys.map((obj)=>{return obj})}
      {badKids.map((obj)=>{return obj})}
      {platformRender.map((obj)=>{return <div className="platform" style={{left: obj[0]+progress+modifier+'vw', top: (obj[1]+11)*vh+"px"}}></div>})}
      {wallsRender.map((obj)=>{return <div className="wall" style={{left: obj[0]+progress+modifier+'vw', top: obj[1]*vh+"px"}}></div>})}
      {itemLocationsRender.map((obj)=>{return <div className={"fieldItem "+obj.className} style={obj.position?{left: obj.position[0]+progress+modifier+'vw', top: obj.position[1]+"vh"}:null}></div>})}
      {objects.map((obj)=>{return <div className={"active "+obj.itemClassName+"-missile"} style={objects[0]?{left: obj.position[0]+'vw', top: obj.position[1]+"vh"}:null}></div>})}
      {snowballs.map((obj)=>{return <div className="snowball" style={snowballs[0]?{left: obj.position[0]+'vw', top: obj.position[1]+"vh"}:null}></div>})}
    </div>
    <button className="button-right" onMouseDown={right} onMouseUp={stop} onTouchStart={right} onTouchEnd={stop}>
    </button>
    <section className="menu">
    {items.map((item)=>{return <div className={"item "+item.className} onClick={(e)=>{activeItem=item}}></div>})}
    </section>
    {overlay} 
    <div className="blinder"></div>
    {modals[0]}
    </div>
  );
}

export default App;
