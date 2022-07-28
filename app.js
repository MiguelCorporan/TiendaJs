import Todo from "./Data.js";
const LosTres = document.getElementById("Otras");
const Main = document.getElementById("Main");
const Nav = document.querySelector(".Nav");
const Carrito = document.querySelector(".Carrito");
const ObCard = document.querySelector('.ObjCard')
const Modal = document.querySelector('.Modal')
const MoreInfoModal = document.querySelector('.MoreInfo')
let Card = []

const {Tegnologia,Electrodomesticos,Otros} = Todo

const Limpiar = (className) => {
  const Element = document.querySelector(className)
  while (Element.firstElementChild) {
    Element.firstElementChild.remove();
  }
};

// const LimpiarModal = () => {
//     while (MoreInfoModal.firstElementChild) {
//       MoreInfoModal.firstElementChild.remove();
//     }
//   };

// const LimpiarCarrito = () => {
//     while (ObCard.firstElementChild) {
//       ObCard.firstElementChild.remove();
//     }
//   };

const CrearHTML = (Datos) => {
  Limpiar('.Main');
  console.log(Datos);

  const template = document.querySelector("#Template-Producto").content;
  const Fragmento = document.createDocumentFragment();

  Datos.forEach((element) => {
    template.querySelector(".Name").textContent = element.Name;
    template.querySelector(".Imgs").setAttribute("src", element.Img);
    template.querySelector(".Precio").textContent = element.Precio;
    template.querySelector(".Buton-G").id = element.Id;
    template.querySelector(".Buton-G").textContent = "Agregar";
    template.querySelector(".Buton-R").textContent = "Ver mas";
    template.querySelector(".Buton-R").id = element.Id;

    const Clone = template.cloneNode(true);
    let category;

    if (typeof element === "string") {
      category = document.createElement("h2");
      category.textContent = element;
      category.classList.add("Category");
      Fragmento.appendChild(category);
      return;
    } else {
      Fragmento.appendChild(Clone);
    }

    Fragmento.append(Clone);

  });
  Main.appendChild(Fragmento);
};


const CreaCard = () => {

    Limpiar('.ObjCard')
    
    const template = document.querySelector("#Template-Carrito").content;
    const Fragmento = document.createDocumentFragment();

    Card.forEach((datos) => {

            template.querySelector('.ImgCard').setAttribute("src", datos.Img);
            template.querySelector('.R').id = datos.Id;
            template.querySelector(".Pname").textContent = datos.Name ;
            template.querySelector(".PPrecio").textContent =  datos.Precio;
            template.querySelector('.R').textContent = 'Eliminar';
            template.querySelector('.G').textContent = 'Comprar';

            const Clone = template.cloneNode(true)
            Fragmento.appendChild(Clone)
            
    })
    ObCard.appendChild(Fragmento)
}
/******************************************/

const DataModal = (DatosEnModal) => {

    Limpiar('.MoreInfo')

    const template = document.querySelector('#Template-Modal').content
    const Fragmento = document.createDocumentFragment()
    const TodoLosIDBuscarEnModal = [...Tegnologia,...Electrodomesticos,...Otros]
    const ella = TodoLosIDBuscarEnModal.find(Product => Product.Id == DatosEnModal)

        template.querySelector('.Imodal').setAttribute('src', ella.Img)
        template.querySelector('.NameModal').innerHTML = `<span class="bold" >Nombre: </span> ${ella.Name}`
        template.querySelector('.PrecioModal').innerHTML = `<span class="bold" >Precio: </span> ${ella.Precio}`
        template.querySelector('.EstadoEnModal').innerHTML = `<span class="bold" >Estado: </span> ${ella.Estado}`
        template.querySelector('.DisponibleModal').innerHTML = `<span class="bold" >Disponible: </span> ${ella.Disponible}`
        template.querySelector('.Aler').textContent = 'Comprar'
        template.querySelector('.AG').id = ella.Id
        template.querySelector('.AG').textContent = 'Agregar'
        
        const Clone = template.cloneNode(true)
        Fragmento.appendChild(Clone)
 
    MoreInfoModal.appendChild(Fragmento)
}

/*---------------------------------------*/

const AddCard = (ElID) => {

  const TodoLosID = [...Tegnologia,...Electrodomesticos,...Otros]
  const ElIDNew = TodoLosID.find(IDNe => IDNe.Id == ElID)
  const FilterID = Card.find(ID => ID.Id == ElID)

        
        if (FilterID) {
          const err = document.querySelector('.error')
          err.textContent = "este pruducto ya esta agregado"

          setTimeout(() => err.textContent = "", 3000);
          return
        }

        Card = [...Card, ElIDNew]
        console.log(Card);
        CreaCard()
}

const DeleteCard = (ElIDdelete) => {
    const delet = Card.filter(Eliminado => Eliminado.Id != ElIDdelete)
   // console.log(delet);
   Card = [...delet]
   CreaCard()
}

const AlerModal = () => {
    setTimeout(() => {
        alert('Este es un Proyecto de prueba por lo que no podemos realizar su comprar')
    }, 1000);
}


//-----------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

const vaciarCarrito = () =>{
  Card = []
  CreaCard()
}

document.addEventListener("click", (e) => {

  if (e.target.matches(".ClassSvg")) Nav.classList.toggle("View");
  if (e.target.matches(".Close *")) Nav.classList.toggle("View");
  if (e.target.matches(".CarritoIcon *")) Carrito.classList.toggle("View");
  if (e.target.matches(".CloseCard *")) Carrito.classList.toggle("View");
  if (e.target.matches('.Buton-G')) AddCard(e.target.id);
  if (e.target.matches('.R'))(DeleteCard(e.target.id));
  if (e.target.matches('.Buton-R')) Modal.classList.toggle('ModalVer')
  if (e.target.matches('.CloseModal *'))  Modal.classList.toggle('ModalVer')
  if (e.target.matches('.Aler')) AlerModal()
  if (e.target.matches('.G')) AlerModal()
  if (e.target.matches('.Buton-R'))  DataModal(e.target.id);
  if (e.target.matches('.vaciar'))  vaciarCarrito()

  if (e.target.matches(".ElH1")) {
    const TodosEnUno = [
      "Electrodomesticos",
      ...Todo.Electrodomesticos,
      "Tegnologia",
      ...Todo.Tegnologia,
      "Otros",
      ...Todo.Otros,
    ];
    CrearHTML(TodosEnUno);
  }
});


const LaPoderosa = (Name) => {
  const Sacando = Todo[Name];
  CrearHTML([Name, ...Sacando]);
};

const CreaTipos = (tipo) => {
  console.log(tipo);
    const result = [...Tegnologia,...Electrodomesticos,...Otros]
     const fill =  result.filter(obj => obj.Tipo === tipo)

   CrearHTML(fill)
   
};


/******----------------------------------------------------- */
/*---------------------------------------------------------------------*/


Nav.addEventListener("click", (e) => {
  if (
    e.target.id == "Mobil" ||
    e.target.id == "Tablet" ||
    e.target.id == "Mini Lapto" ||
    e.target.id == "Mueble" ||
    e.target.id == "Cama" ||
    e.target.id == "Limpieza" ||
    e.target.id == "Carro" ||
    e.target.id == "Ejercicio" ||
    e.target.id == "Polera" ||
    e.target.id == "Tenis"
  ) {
    CreaTipos(e.target.id);
  }
});

LosTres.addEventListener("click", (e) => {
  if (
    e.target.id == "Tegnologia" ||
    e.target.id == "Electrodomesticos" ||
    e.target.id == "Otros"
  ) {
    LaPoderosa(e.target.id);
  }
});

addEventListener("DOMContentLoaded", (e) => {
  e.stopPropagation();
  const array = [
    "Electrodomesticos",
    ...Electrodomesticos,
    "Tegnologia",
    ...Tegnologia,
    "Otros",
    ...Otros,
  ];
  console.log(array);
  CrearHTML(array);
});




