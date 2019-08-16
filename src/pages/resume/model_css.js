const basicColor = {
  one: 'rgb(6, 132, 250)',
  two: '#222',
  three: '#019a89',
  four: '#2955a1',
  five: '#223e64'
}
export const style = {
  // model one
  modelonecontent: {
    padding: '60px'
  },
  modelonetitle: {
    display: 'inline - block',
    width: '160px',
    height: '40px',
    margin: 0,
    lineHeight: '40px',
    background: basicColor.one,
    textAlign: 'center',
    borderRadius: '28px 18px 18px 0',
    fontSize: '20px',
    color: '#fff'
  },
  modeloneborder: {
    height: '2px',
    width: '100%',
    background: basicColor.one
  },
  modeloneinfo: {
    position: 'relative',
    margin: '15px 0',
    fontSize: '16px',
  },
  modeloneavatar: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '130px',
    height: '160px',
    background: '#ddd',
  },
  modeloneback: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    color: basicColor.one,
    marginBottom: '5px'
  },
  modeloneworkli: {
    margin: '10px 0',
    padding: '10px 0',
    borderBottom: '1px solid rgb(22, 147, 248)'
  },
  modeloneworklilastchild: {
    border: 'none'
  },
  modelonedesclist: {
    margin: '5px 30px'
  },
  modeloneevalli: {
    margin: '5px 0'
  },
  modeloneworkdesc: {
    margin: '10px 0',
    fontWeight: 600,
    lineHeight: '30px'
  },
  modeloneworkdescspan: {
    fontWeight: 500
  },
  // model two
  modeltwotitle: {
    display: 'inline - block',
    width: '160px',
    height: '40px',
    margin: 0,
    lineHeight: '40px',
    fontSize: '20px',
    color: basicColor.two,
    fontWeight: 550
  },
  modeltwoavatar: {
    float: 'left',
    width: '130px',
    height: '160px',
    background: '#ddd'
  },
  modeltwoback: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    color: basicColor.two,
    marginBottom: '5px'
  },
  modeltwoworkli: {
    margin: '10px 0',
    padding: '10px 0',
    borderBottom: '1px solid #ddd'
  },
  modeltwobasic: {
    float: 'right',
    width: 'calc(100% - 160px)',
    marginLeft: '30px'
  },
  modeltwobasicname: {
    fontWeight: 600,
    fontSize: '34px',
    marginBottom: '10px',
    color: basicColor.two
  },
  modeltwobasicul: {
    height: '22px',
    lineHeight: '22px',
    margin: '20px 0',
  },
  modeltwobasicli: {
    float: 'left',
    fontSize: '16px'
  },
  modeltwoavatarborder: {
    position: 'absolute',
    bottom: '10px',
    width: '100%',
    height: '3px',
    background: '#ccc'
  },
  modeltwobasicbox: {
    position: 'relative',
    width: '100%',
    height: '200px'
  },
  // model  three
  modelthreetitle: {
    position: 'relative',
    display: 'inline - block',
    width: '160px',
    height: '40px',
    margin: 0,
    lineHeight: '40px',
    fontSize: '20px',
    color: basicColor.three,
    fontWeight: 600
  },
  modelthreeCircle1: {
    position: 'absolute',
    top: '10px',
    left: '-70px',
    width: '30px',
    height: '30px',
    background: '#fff',
    borderRadius: '50%'
  },
  modelthreeCircle2: {
    width: '10px',
    height: '10px',
    background: basicColor.three,
    transform: 'rotate(45deg)',
    margin: '10px'
  },
  modelthreeborder: {
    height: '2px',
    width: '100%',
    background: basicColor.three
  },
  modelthreeavatar: {
    float: 'right',
    width: '130px',
    height: '160px',
    background: '#ddd'
  },
  modelthreebasicbox: {
    position: 'relative',
    width: '100%',
  },
  modelthreebasic: {
    float: 'left',
    width: 'calc(100% - 130px)',
  },
  modelthreeLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '150px',
    height: '100%',
    background: basicColor.three
  },
  modelthreeright: {
    float: 'right',
    marginLeft: '20px',
    width: 'calc(100% - 170px)'
  },
  modelthreeback: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    color: basicColor.three,
    marginBottom: '5px'
  },
  modelthreeHeader: {
    paddingRight: '60px',
    paddingTop: '60px',
    overflow: 'hidden',
    position: 'relative'
  },
  // model four
  modelfouravatar: {
    float: 'right',
    width: '130px',
    height: '160px',
    background: '#ddd'
  },
  modelfourbasicbox: {
    position: 'relative',
    width: '100%',
  },
  modelfourbasic: {
    float: 'left',
    width: 'calc(100% - 130px)',
  },
  modelfourtitle: {
    position: 'relative',
    display: 'inline - block',
    width: '160px',
    height: '40px',
    margin: 0,
    lineHeight: '40px',
    background: basicColor.four,
    textAlign: 'center',
    fontSize: '20px',
    color: '#fff',
    zIndex: 2
  },
  modeltriangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    marginTop: 0,
    borderTop: '20px solid transparent',
    borderLeft: '15px solid ' + basicColor.four,
    borderBottom: '20px solid transparent',
    right: '-15px',
    top: 0,
    zIndex: 10
  },
  modelborder: {
    position: 'absolute',
    top: '20px',
    width: '100%',
    height: '2px',
    zIndex: 1,
    background: basicColor.four
  },
  // model five
  modelfivetitle: {
    position: 'relative',
    display: 'inline - block',
    width: '160px',
    height: '40px',
    margin: 0,
    lineHeight: '40px',
    fontSize: '20px',
    color: basicColor.five,
    fontWeight: 600
  },
  modelfiveborder: {
    height: '2px',
    width: '100%',
    background: basicColor.five
  },
  modelfiveLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '280px',
    height: '100%',
    background: basicColor.five
  },
  modelfiveright: {
    float: 'right',
    marginLeft: '30px',
    width: 'calc(100% - 310px)'
  },
  modelfiveCircle1: {
    position: 'absolute',
    top: '10px',
    left: '-45px',
    width: '30px',
    height: '30px',
    background: basicColor.five,
    borderRadius: '50%'
  },
  modelfiveCircle2: {
    width: '10px',
    height: '10px',
    background: '#fff',
    borderRadius: '50%',
    margin: '10px'
  },
  modelfiveback: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    color: basicColor.five,
    marginBottom: '5px'
  },
  modelfiveavatar: {
    width: '130px',
    height: '160px',
    margin: '60px auto'
  },
  // model common
  img: {
    width: '100%',
    height: '100%'
  },
  clear: {
    clear: 'both'
  },
  modelspan: {
    float: 'left',
    width: '2px',
    height: '22px',
    margin: '0 8px',
    background: '#ccc'
  },
}
