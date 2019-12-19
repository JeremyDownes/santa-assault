var enemies = [

{name: "snowman",position: [100,58],damage:.2,health:3,range:80,flip: 1,count: 0, drop: {name:"Letter",className:"letter"} },
{name: "snowman",position: [650,58],damage:.2,health:5,range:80,flip: -1,count: 10},
{name: "snowman",position: [650,58],damage:.2,health:5,range:80,flip: -1,count: 10},
{name: "snowman",position: [790,58],damage:.2,health:8,range:80,flip: 1,count: 15, drop: {name:"Salt",className:"salt",position: [50,64],method:'salt',count: 20}},

{name: "gumdrop",position: [150,58]},

{name: "ginger",position: [550,58],damage:.5,health:15,range:107,flip: 1,count: 0},

{name: "elf",position: [1289,58],damage:.05,health :3},
{name: "elf",position: [1125,58],damage:.05,health :3, drop: {name:"Cookies",className:"cookies",position: [50,64]}},

{name: "toy",position: [1334,58],damage:.05,health :30,range:102,flip: -1,count: 2},

//{name: "badKid",position: [100,58],range:80,flip: 1,count: 0, direction: 'right'},
{name: "badKid",position: [1080,58],range:80,health:100,flip: 1,count: 0, direction: 'right', drop: {name:"Letter",className:"letter",position: [1082,64]}},


]


  export default enemies