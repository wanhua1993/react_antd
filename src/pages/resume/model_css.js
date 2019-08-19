export const styleList = (model, color) => {
  const style = {
    common: {
      // common model code
      modelTitle: {
        display: 'inline - block',
        width: '160px',
        height: '40px',
        margin: 0,
        lineHeight: '40px',
        fontSize: '20px',
      },
      modelinfo: {
        position: 'relative',
        margin: '15px 0',
        fontSize: '16px',
      },
      modelAvatar: {
        width: '130px',
        height: '160px',
      },
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
      modelBack: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '16px',
        marginBottom: '5px',
        color
      },
      modeldesclist: {
        margin: '5px 30px'
      },
      modelevalli: {
        margin: '5px 0'
      },
      modelworkdesc: {
        margin: '10px 0',
        fontWeight: 600,
        lineHeight: '30px'
      },
      modelworkdescspan: {
        fontWeight: 500
      },
      modelworkli: {
        margin: '10px 0',
        padding: '10px 0',
        borderBottom: '1px solid #ddd'
      },
    },
    one: {
      modelonecontent: {
        padding: '60px'
      },
      modelonetitle: {
        background: color,
        textAlign: 'center',
        borderRadius: '28px 18px 18px 0',
        color: '#fff'
      },
      modeloneborder: {
        height: '2px',
        width: '100%',
        background: color
      },
      modeloneavatar: {
        position: 'absolute',
        top: 0,
        right: 0,
      },
      modeloneworkli: {
        margin: '10px 0',
        padding: '10px 0',
        borderBottom: '1px solid rgb(22, 147, 248)'
      },
      modeloneworklilastchild: {
        border: 'none'
      }
    },
    two: {
      modeltwotitle: {
        color,
        fontWeight: 550
      },
      modeltwoavatar: {
        float: 'left',
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
        color
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
    },
    three: {
      modelthreetitle: {
        position: 'relative',
        color,
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
        background: color,
        transform: 'rotate(45deg)',
        margin: '10px'
      },
      modelthreeborder: {
        height: '2px',
        width: '100%',
        background: color
      },
      modelthreeavatar: {
        float: 'right',
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
        background: color
      },
      modelthreeright: {
        float: 'right',
        marginLeft: '20px',
        width: 'calc(100% - 170px)'
      },
      modelthreeHeader: {
        paddingRight: '60px',
        paddingTop: '60px',
        overflow: 'hidden',
        position: 'relative'
      },
      modelthreebasicname: {
        fontWeight: 600,
        fontSize: '34px',
        marginBottom: '10px',
        color
      },
      modelthreebasicul: {
        height: '22px',
        lineHeight: '22px',
        margin: '20px 0',
      },
      modelthreebasicli: {
        float: 'left',
        fontSize: '16px'
      },
    },
    four: {
      modelfouravatar: {
        float: 'right',
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
        background: color,
        textAlign: 'center',
        color: '#fff',
        zIndex: 2
      },
      modeltriangle: {
        position: 'absolute',
        width: 0,
        height: 0,
        marginTop: 0,
        borderTop: '20px solid transparent',
        borderLeft: '15px solid ' + color,
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
        background: color
      },
      modelfourbasicname: {
        fontWeight: 600,
        fontSize: '34px',
        marginBottom: '10px',
        color: color
      },
      modelfourbasicul: {
        height: '22px',
        lineHeight: '22px',
        margin: '20px 0',
      },
      modelfourbasicli: {
        float: 'left',
        fontSize: '16px'
      },
    },
    five: {
      modelfivetitle: {
        position: 'relative',
        color: color,
        fontWeight: 600
      },
      modelfiveborder: {
        height: '2px',
        width: '100%',
        background: color
      },
      modelfiveLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '280px',
        height: '100%',
        background: color
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
        background: color,
        borderRadius: '50%'
      },
      modelfiveCircle2: {
        width: '10px',
        height: '10px',
        background: '#fff',
        borderRadius: '50%',
        margin: '10px'
      },
      modelfiveavatar: {
        margin: '60px auto'
      },
    },
    six: {
      modelsixavatar: {
        textAlign: 'center'
      },
      modelsixtitle: {
        position: 'relative',
        color,
        fontWeight: 600,
      },
      modelsixborder: {
        height: '2px',
        width: '100%',
        background: color
      },
      modelsixbasicbox: {
        position: 'relative',
        width: '100%',
      },

      modelsixbasicname: {
        fontWeight: 600,
        textAlign: 'center',
        fontSize: '34px',
        marginBottom: '10px',
        color
      },
      modelsixbasicul: {
        height: '22px',
        width: '525px',
        lineHeight: '22px',
        margin: '20px auto',
      },
      modelsixbasicli: {
        float: 'left',
        fontSize: '16px'
      },
    },
    seven: {
      modelseventitle: {
        background: color,
        textAlign: 'center',
        color: '#fff'
      },
      modelsevenavatar: {
        position: 'absolute',
        top: 0,
        right: 0,
      },
      modelsevenCon: {
        textAlign: 'center',
        borderBottom: '2px solid #000',
        fontSize: '40px',
        padding: '5px 0'
      }
    },
    eight: {
      modeleighttitle: {
        position: 'relative',
        color,
        fontWeight: 600
      },
      modeleightCircle1: {
        position: 'absolute',
        top: '10px',
        left: '-40px',
        width: '30px',
        height: '30px',
        background: color,
        borderRadius: '50%'
      },
      modeleightCircle2: {
        width: '10px',
        height: '10px',
        background: "#fff",
        borderRadius: '50%',
        margin: '10px'
      },
      modeleightborder: {
        height: '2px',
        width: '100%',
        background: color
      },
      modeleightavatar: {
        float: 'right',
      },
      modeleightbasicbox: {
        position: 'relative',
        width: '100%',
      },
      modeleightbasic: {
        float: 'left',
        width: 'calc(100% - 130px)',
      },
      modeleightbasicname: {
        fontWeight: 600,
        fontSize: '34px',
        marginBottom: '10px',
        color
      },
      modeleightbasicul: {
        height: '22px',
        lineHeight: '22px',
        margin: '20px 0',
      },
      modeleightbasicli: {
        float: 'left',
        fontSize: '16px'
      },
      modeleightheader: {
        position: 'relative',
        height: '40px',
        width: '100%',
        marginBottom: '20px',
        background: color
      },
      modeleightwrite: {
        position: 'absolute',
        top: 0,
        left: '100px',
        width: '15px',
        height: '100%',
        background: '#fff'
      }
    }
  }
  return {
    ...style[model],
    ...style['common']
  }
}