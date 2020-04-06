import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import RoomIcon from "@material-ui/icons/Room";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "20px",
    marginRight: "20px",
    width: "400px",
    [theme.breakpoints.down('xs')]: {
      width: "290px",
    },
  },
  paper: {
    padding: "12px",
    margin: "12px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "0px solid grey",
    borderTop: "4px solid #3f51b5",
    boxShadow: "-1px 3px 10px 1px rgba(0,0,0,0.25)",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "initial",
    justifyContent: "space-between",
    width: "100%",
  },
  locRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    color: "#1976d2",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  avatar: {
    margin: "10px",
    width: theme.spacing(12),
    height: theme.spacing(12),
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  },
  name: {
    alignSelf: "flex-start",
    margin: "10px",
  },
  icon: {
    marginLeft: "5px",
    marginRight: "5px",
  },
  endDate: {
    width: "100%",
    fontSize: "12px",
    color: "#eb3b5a",
    alignSelf: "flex-end",
  },
  price: {
    alignSelf: "flex-start",
    color: "#20bf6b",
    fontSize: "18px",
    margin: "10px",
  },
}));

export default function HomeCard(props) {
  const classes = useStyles();
  var time = new Date(props.endTime*1000);
  
  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <div className={classes.row}>
          <Avatar
            alt="avatar"
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEhAQEA8QEBAPEBAPDw8PDw8PDw8PFRUWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQFSsdFx0rLS0tLSsrLS0rLSsrLS0tLS0tKy0tLS0tKy0tLSs3Ky0tLS03Ky03Ky0tNysrKy0tK//AABEIANoA6AMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xAA6EAACAQIEAwYDBwIGAwAAAAAAAQIDEQQFITESQVEGImFxgZEHEzIUI0JScqGxYsEkM4LR4fE0Q6L/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAiEQEBAAICAgMBAQEBAAAAAAAAAQIRAyESMSJBUTIEQhT/2gAMAwEAAhEDEQA/AOQfYWRKtOzLVVXYrcQ9TXTPZkCAGhKBskYem2R2TMO9BlkdWGfUDpy6i4VWONlaZokqL6kapGxYyRDqWu+v7CqsexRslq9ei3HIzguv7f2IrsuV/MXGqvyr2I208Yu6aTjoouL25OMuje4KkUoynwtWlqlK9o9fErKM7Luyd112a6NFxktT5l42UtPpfNC3T8ZfomlT4uFqV1P6Xrr4eDK/MaTi9Xc0NPDRipOlG8XG86UpWXi484tcmUONvJcWvqrNocrO4a9KtC4iRSKFTPtXdsJw9Nt6EdE3BOw4jWkj7LLqJlgpPcmRqh/NHqn0r3l7Ideg4l58wrseKwbRqK0Aqd2Kw60HKWjJLfZ6GGlbmK+xzJdOvZByxQdq1ijwo1I7NgHJYwINUaxRY09CtxK1L1U9Ckxm49nrtHDQQaEY7am27O9nvn03JLVIxXNHWfh3iIxptPoLK2TcZ5/TEY/LXSk01sMKka/tQ4Sm7GelSNMbbNolnpV42XBHTd6IquRMzefft+Wy99SLCm5WsZ5V04To2Kg3yHfs0ujJ2CyapUekX6k+UX41CpRd1Y0WWZVNuMoPhnF6KKT05pu5dZJ2R2dTzsbrK8rjTSUY6Ixz5pPTTHi/WOw2Q1rTqOKejk0utt9TNqnKq5QlLi13bTmo+a3O80MBeO2nM51nfZn5GNpuKtTrybT5JtWlF+yI4+XfVVnxz6corU3GUoveLafoEkW/anLZUK3eT+8jxJvm1o/7e5UHZLuOPLqlJEzCIjRJuB3KiKnQpi/lkimkLsitjxRVSK/MY2LtRRVZsibTsQcMOUo3YjDEjDLvEp+02OH0GqlEuqVNWQxWpoUza3DpSSpALGdMBW0aNVNmUGL3NPjsJKC1RmMVuycV32ji6YkcorUoUc1qjZ9mMQ4waT5GQrrY0/ZySsNhzfyazXEvjdxqjir7iM+0kQKMjXfx0zxx62azVfeX6pP20JOUYfi18RjGK6i+l17/APRZ5PTtBebOPmuo9H/PPJb4LCQW6RocNOEbWSVuiKOnLYs8HHxRx212aXVDFWLzBVk7dTNQp7allldXvxWu9uhFNvMFO0bdbD2ZZUsRSWi4oSUovo0Q8NUVld7dS7yzExkrKUW+iaY4xz6cQ+MGRzisG4QlOadWnKMYuUrtcWy8jlqR6t7TZa6rqWk4tUpTi1+dRmk/ez9DyjT2Xkjt4ctzX45eWer+nIsmYNEJGw7BZSsTVjB82bW6m2FqHSg+g6oN8jtk/h1S4VZq9irfYeNOaujn/wDRG8jlXyZLdMqs1R27OOzFJRVkjl/bPLFS2Kw5PKs87GTwxKwy7xFwpOwUbzRtWVuq0NBd0ZrRJjslFdS6qZC3RVRdOhz706ZnMpqMfUQRKxWHaugGsRWu7SZdGUZNLZM5HmMbTaOz5/XtTn6nGc0lecvMng349s97zQx7DLUZH8NujZd9H8ZG1i2yKT0KnGy2LbIt0Njn/JvPlqQKOxbZ/T1uVVIuek4X4nFS4oy11ik1HquZZZZUvSj1XdfoRMLo07Xty6+BKy5W+Ykmu9fhfJ8zj/0x6P8AjqZHERX1TUfUeWa04f8AtT8DO5lRblom2yCsLNtaaPndaEY8eNm2ueeUvpu8J2iUu6mn0dyxr5hWpRjVjSbSTaqS7sPdmCy3CT4otPZ7dUdpoZLDG5aqDS41fhevdlunoZ5YzGqmVsc6r9vMVVnGDqQgm1HuRbu3pvzOtdhE4StLic72qOzXDNbxkrJpnLsP2PqUqkYVqSahK/eldefidryKolTp04pJR5JaXHnlj6iPG/Z7tlh6s6dP5TtepBVLOzdNd6yfmjytjJqVSpKP0yqVJR/S5Nr9rHp/4i9oIZfg/nzTlJt06MV+KrKElG/RLd+CPLUFay6KxrwY92ufly+Mx/CjpPwgX+Jh5o5sdL+D/wD5MPNG3J/Nc1+noUq83dnEtSnzpaxOPOdOiqfNn3Ucl+IqOr5tLunJPiDUuVwe4wzYXCbkzDO0l5kTB7kugu8jtrPJoaLvKF+qO05Tl0ZYK7X4bnF6Wjg/FHc8infAf6GcfJ6iuKuK5zViqsodGwEHPH/iZ/qf8hm8nSPKr/tHi04z16nLMa+8/MsMTm9SaabepU1JXNMcfGaaYY3dtJQ7SY0hymNrSqkrsvcllaxn5bkrD4mUdhs88dzS67QVSrwWo3ia8p7jdJyQ99aTjhqaWUWSMLik3FNriu4vx5xf7NFP82QzKbve+pHJjM8dNeHK8eW2zVBSVmRKmWJvm/XQbw2Puot7218+Zb4bFKxwd49PT6y7R8NRVOytrvf+x1X4aV+OM4S/LZHMK9RfW/pjv5Go+HnaKlDEUo8aaqS4FbqTd0WfGt32iqQvGLS108bjuT20sQu0jhiZdzuuEmr3T4td9OROyfDuKTfTUm+0z0zfxzkp5fTXOOKpv/5mjgR3L4n4yDy7FKoryjVo/J1s/mccdV6cRw9rZ7p7M7uC/Fw80+QjpPwhqJYiF3bVHNmWuR5vPDTUot3RrlNyxhk9dplTnVaKsm1c4UvibiLJcT08WQ8X2+rzd3J+5z3hys1V3kv47Fm9SPBujjvbqom9GRa3bOtJWbfuZ/MsxlV3K4+G43bO7v0awW7JdJ94iYDcdrTszepvtopT0h6Hb+zFaLy/f8DPOX2+Vl4GkwHbWrSpOkm7WtuY5cds0WMuN2j55P8AxE/1MBRYrHSnNze7dwGuh41GqU7Ir6he4mloUlbccdJtDkBtDkQgBblhTgrECG5cUad0NNIpwXQe+Wug/h6BL+zk2qkVNSkuhW1o6mjrYfQocUrMMeyy6KjJpaciwwWL6vzIdOjJwc+F8EVrLaK9eb8CHSqtarZmfJhK24eS600VTM004xeltbvQraD4JqUakYNSUrqWv7EfDuH4le4/HEqL0hf/AEojWum+992uk9nsb8yC71SbktLUppN+De/mbfs3mrkqtKcXGVJbtrnzMR2ZzdypJ8EYuKt7ckXNLGqLlPZ1O7fXe3gYWbp5WfQviFlKq5Tiq2kpxrUq0X+WCmou3o2cu7E4GnXqSoV48UJRclq4uM1tJNeFzsWOxSngMVSf0zo1E77aRuv3ON9j6vBiOJvanP8Ag34LvcYcuPSRi8pw0Zyp2qwlFtf5kWv3WwzLJqa2rST/AKoRl/DREzDFynWlK71eoqVdrfmdDn0Kpl9tpxl53j/IqWV1ErunKz2a7yfqiPVxnUbpZlKOibt0EaVHCP8AJL2Yzi6FkCObTT6ehYU8wp11avTty+bT0kn4rZgKq8vWo9WjqOvB/JqOPEpKylCa2nF8wTj3imF/oiNNBSiiwp4fQarUCN9t9dIErAH5UAFBLxke6zN192afHfSZnEbixVl7NIXEQhcSio4bl3h3oikhuXWEjeyBN9rLCktCKWFcYcb0S3b2KfHZq9Y09P6nv6dDO9tJWgeHp8N6taNNPZaOb9ORTY14KGqp1az3vOooQv5Rs2ZypJ7ttvq3cQ5MUwv6q2fiXjcZKo7t2SVowWkILpFciLSe69RAcHZlaEvZyM2iZRxqtruMONxt0yel6rRZVnU0uFLbp0Nblk3wqUt5eOkVuc7wVXgu/JIt6naGXCow0svqM88fxeP7Wq7XZ7GnQ+zU5d6olxvpC/8Acw2S1LVW+VmRMViHJtttt9RWAxDhNJK/FB8XhzuXx4+MZ8t2VKf3s/Fj+Il3fFaplfhpcU2+rbJGLnbQ2Y6R6kgoDY4thGKrLUn5JNcU+LaMHL1X/ZWSY9hJ24/0/wB0IX0vqNaMoqG0ocUove6f1R9xlLvDnZmCbcp7VG6UfNrVhTg41HF7xbT9CmGU7XNCn3RjEQJeGl3RjEHPv5OrrxiA4gFyDNGRrGz7rM1X3NHjsNJRd0zPTWpWIt7Mi4IFRD2EV2ULeiKUe8kaKFqMVKb1avGP4pf8FXHhjPie0dXboiJicS6knJvd7dFyQVOPdTMxzOdX6pd1fTBfSv8Ad+JXuqE0JvYTUbkJYrjCbAEBpAYTYgepztoxy4zVcbq0uJWWtrNPmmg0/EmxcyOSE3EuYhsWleR6jS429bW18x7Ksxlhqk6kYxk506tK01dWmuG4ynwJrm/4IxbLe0vAR1v0QivUux2n3YX6kXcZQqAuWgmmhVTcAZmKp7S8khNXcOD0fi0hGv8AI5XlDlGinNv+p6Fnm9NSnCpF6zilNL865+38GfwGK4IyS52fnYvMujpTlLeVT2jbQbHk67WWGwc7LR6miwHZWVWPFYtp0IqlTklyRrckt8peRxcmdl6VjybmnGs7yuVCTVgHUsx7PRxHE2tQFzmknavG1nM8yyHypNRWxxvMlwzlbqd6zyn9zL9JwbOP8yXmH+S2ynyf2hti6UrDYpHWnSZhat5Pi24ZX9iBYeo7S/SxkKeM1sqMg2IDjISgYEw2hIgNhMFwACWgkhQuhBSlGLfCm0nLp4gZSV9vUcjT5juLoRpVXCE+ONl3tN+gJS0JP6Rqr1YiCFS3FUNyknMRKyihiIvEvXyEQAFwYrf3EyYuIwYrPVgk7JeNxM3dgm9l0QgmYJLmaTB4pJQhvJyUn/Slt6szGFV2ktDU4XCwVGVvr0m5PdtcvYbLk9VvI46LpQV9bI3PZxXpJ+BxylXajHXodS7C47jpqPgcnNjrthxXtdQrWugDeYTjC/mAxyx27McumMzHOacqE1xK/D1OKZvK9STXUclmFS1uJlfOV3qdvFxTjl0i7uW6CDuJQZqZyjK3F4xaGmGhLFTgABcFxGVFgkhAuEgBIBTQkAUFYK4pMAOluvMW5jaBU3fmAOyQqC19AJXV/AKIyMzerDgFPcOnuIy5i72TfgNzeoK0tLDI1DcK+oI8wokmnYOSujT4HEfh4b3VuF7a6O5kKU31saDLqnBa7u3zKRlFhGul3b/S2tfBnT+w+PpU4XcknY43mkZKo5Rek0peuz/j9wqOY1oKykzPPCZTTCYWXcdg7Q55BvSa36gON1cfUlu2AJx4q+RnE00kVky3xexTzNI2gRFCUKGB09xMt2Lpbi8UtV4oRz2jgsGARkgTDCYAu4BCYpMAAVwwmgA0wTfP0BC11e9r626EjHqkpL5Dk4OKbU91Lmk+aAx05fdu2609BuDDwk7XXUE92NJM0FTdmg7hSWwGDmr3Ezd2FU3CuIFzso6bsbQTYExGegWGGq6lZGoTcLUbaSUb8roqJsaWglVsrbLcTWwiQ/kUX3uK17bIexZllfkrHGeKnlQQCU4hlbRYpcXLQqZlhXnoV8ixAQoQhQGVS3HcXuvIao7oXivq9EFKezIAAEoBLFWCYAkNMIAjKDE3BcYGwmHcAAqjuLbGovUO4EUmG5CbhOQwObGmwSYEibTAMIO4gNMkUk1ZrdDMLX1RYUFTjreXloyoVaXKsQkqbe7tGXq7ErGIoaU41GlTnwu6b4tLWLrFTIznexjerEWQBM5BgnbL1GRmOzkMs1EAWIFIR07hleSJWb0eGUHylH+GR8F9a8zYdq8ntgaOJW8Kqpy/TOLt+8RZXSP+ow4aCFJA0KESQ9FCaiGDAAmAkxgCAGwMFwgADlGN2kt20l5vQss8yaWFlCMqkJupDitF6w8Girg9R2cm3dtt9W22MGWwg5AEBBhoDQaBIaQYpJPnYNAcGSVQcleOvVLdDVOhfZpvoScPQnGSa0dyk0vKqP3kb7RvJ+myLypWuxdHCqcXKKtJ6P0I9+B94izdR5g7sBa5bWptq6QCbdfSPNiMUtSMSMTuMGjaCHqcOrsMod5itVIfocMZJ3dr9C/7W58qtHDYalU4oQvVqpbOptFPyXF7mcqoYZPsXGb2MXEbFIoFwi3z9hypFdRFEdmUmok4iBcxBFUAYEAAAAgwAIcuNgDYG2EAAbA0KbExDYwIXGAlDlMIR2l3dV7lhhVdp30IdAnYLcpFaHAy4XCPWLk/f/gg9oI97QmRWsHz4N+fMpM2m3LVt77tmflqpx4/K72bhi+DZ3l15IBBW4RNtrfwxn0//9k="
            className={classes.avatar}
          />
          <div className={classes.col}>
            <div className={classes.row}>
              <div className={classes.name}>
                <b>{props.subject}</b>
              </div>
              <div className={classes.price}>
                <b>{props.price} zł</b>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.locRow}>
                <RoomIcon color="primary" className={classes.icon} />
                {props.city}
              </div>
              <div className={classes.endDate}>
                wygaśnie: {time.getHours()}:{time.getMinutes()} {time.getDay()}.
                {time.getMonth()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
