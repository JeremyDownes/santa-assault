var enemies = [

{name: "snowman",position: [100,58],damage:.2,health:3,range:80,flip: 1,count: 0, drop: {name:"Letter",className:"letter"} },
{name: "snowman",position: [650,58],damage:.2,health:5,range:80,flip: -1,count: 10},
{name: "snowman",position: [375,58],damage:.2,health:5,range:80,flip: 1,count: 5},
{name: "snowman",position: [500,58],damage:.2,health:12,range:2000,flip: -1,count: 0},
{name: "snowman",position: [790,10],damage:.2,health:8,range:80,flip: -1,count: 0},
{name: "snowman",position: [790,10],damage:.2,health:8,range:80,flip: 1,count: 15},

{name: "gumdrop",position: [150,58]},
{name: "gumdrop",position: [950,58]},
{name: "gumdrop",position: [350,58]},
{name: "gumdrop",position: [650,58]},

{name: "ginger",position: [550,58],damage:.5,health:15,range:107,flip: 1,count: 0},
{name: "ginger",position: [250,58],damage:.5,health:15,range:100,flip: -1,count: 0},
{name: "ginger",position: [400,58],damage:.5,health:15,range:100,flip: 1,count: 0},
{name: "ginger",position: [700,58],damage:.5,health:15,range:100,flip: -1,count: 0},
{name: "ginger",position: [735,58],damage:1,health:25,range:100,flip: 1,count: 0},


{name: "fairy",position: [280,40],damage:1,health:30,range:200,flip: -1,count: 124},
{name: "fairy",position: [400,40],damage:1,health:30,range:200,flip: 1,count: 149, drop: {name:"Coke",className:"coke",position: [50,64],method:'coke',count: 20}},
{name: "fairy",position: [700,40],damage:1,health:30,range:200,flip: -1,count: 199},
{name: "fairy",position: [970,40],damage:1,health:30,range:200,flip: -1,count: 199},
{name: "fairy",position: [1173,40],damage:1,health:30,range:200,flip: -1,count: 0, drop: {name:"Coke",className:"coke",position: [50,64],method:'coke',count: 20}},
{name: "fairy",position: [1146,40],damage:1,health:30,range:200,flip: 1,count: 99, drop: {name:"Letter",className:"letter",position: [1082,64]}},
{name: "fairy",position: [1120,25],damage:1,health:30,range:200,flip: -1,count: 45, drop: {name:"Coke",className:"coke",position: [50,64],method:'coke',count: 20}},
{name: "fairy",position: [1135,50],damage:1,health:30,range:200,flip: -1,count: 199},

{name: "elf",position: [350,58],damage:.05,health :3, drop: {name:"Cookies",className:"cookies",position: [50,64]}},
{name: "elf",position: [504,58],damage:.05,health :3, drop: {name:"Cookies",className:"cookies",position: [50,64]}},
{name: "elf",position: [816,58],damage:.05,health :3},
{name: "elf",position: [814,58],damage:.05,health :3},
{name: "elf",position: [812,58],damage:.05,health :3, drop: {name:"Cookies",className:"cookies",position: [50,64]}},
{name: "elf",position: [810,58],damage:.05,health :3},
{name: "elf",position: [808,58],damage:.05,health :3},

{name: "elf",position: [1177,58],damage:.05,health :3, drop: {name:"Cookies",className:"cookies",position: [50,64]}},
{name: "elf",position: [1148,58],damage:.05,health :3},
{name: "elf",position: [1125,58],damage:.05,health :3, drop: {name:"Cookies",className:"cookies",position: [50,64]}},



{name: "toy",position: [925,58],damage:.05,health :30,range:102,flip: -1,count: 0}, // range must be mutiple of 2
{name: "toy",position: [925,58],damage:.05,health :30,range:102,flip: 1,count: 0},

//{name: "badKid",position: [100,58],range:80,flip: 1,count: 0, direction: 'right'},
{name: "badKid",position: [225,58],range:80,health:200, flip: 1,count: 0, direction: 'right', drop: {name:"Coal",className:"coal-bucket",position: [227,64],method:'coal',count: 20}, },
{name: "badKid",position: [500,58],range:80,health:200,flip: 1,count: 0, direction: 'right'},
{name: "badKid",position: [783,58],range:80,health:200,flip: 1,count: 0, direction: 'right', drop: {name:"Coal",className:"coal-bucket",position: [227,64],method:'coal',count: 20},},
{name: "badKid",position: [875,58],range:80,health:200,flip: 1,count: 0, direction: 'right'},
{name: "badKid",position: [1040,58],range:80,health:200,flip: 1,count: 0, direction: 'right', drop: {name:"Salt",className:"salt",position: [1042,64],method:'salt',count: 20}},
{name: "badKid",position: [1080,58],range:80,health:200,flip: 1,count: 0, direction: 'right', drop: {name:"Letter",className:"letter",position: [1082,64]}},

{name: "blackIce",position: [266,69],range:80,flip: 1,count: 0, direction: 'right'},
{name: "blackIce",position: [364,69],range:80,flip: 1,count: 0, direction: 'right'},
{name: "blackIce",position: [450,69],range:80,flip: 1,count: 0, direction: 'right'},
{name: "blackIce",position: [585,69],range:80,flip: 1,count: 0, direction: 'right'},
{name: "blackIce",position: [793,69],range:80,flip: 1,count: 0, direction: 'right'},
{name: "blackIce",position: [800,20],range:80,flip: 1,count: 0, direction: 'right'},
{name: "blackIce",position: [1060,69],range:80,flip: 1,count: 0, direction: 'right'},


]


  export default enemies