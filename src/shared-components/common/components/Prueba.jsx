import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Virtuoso } from "react-virtuoso";

import './styles/Prueba.scss';

let storedState = undefined;

export default function Prueba() {
  const data = useRef(new Array(50000).fill("xd"));
  const virtuosoRef = useRef();
  const navigate = useNavigate();

  console.log(storedState);

  return (
    <> 
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <h1>Mi apan que me cuentas xd</h1>
      <button  className="m-[50px] flex w-12 items-center justify-center rounded-sm bg-sky-600 p-5" onClick={()=>{virtuosoRef.current.getState((prueba)=>storedState=prueba); navigate("/porfi-funcionaxd");}} style={{ position: "fixed", top: "0", zIndex: "9999" }}>Read virtuoso state</button>  
      <Virtuoso
        style={{ width: "100%" }}
        totalCount={data.current.length}
        increaseViewportBy={200}
        ref={virtuosoRef}
        useWindowScroll
        restoreStateFrom={storedState}
        itemContent={(index) => (
          <div className="prueba-item__virtuoso">
            <div className="prueba-item__virtuoso-content">
              {index}
              {
                index % 10 === 0 ?
                  <p>
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                  </p>
                  :

                  index % 10 === 1?
                    <p>
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                    </p>
                    :

                    index % 10 === 2 ?
                      <p>
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.                                        
                      </p>
                      :

                      index % 10 === 3 ?
                        <p>
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                
                        </p>
                        :

                        index % 10 === 4 ?
                          <p>
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet. 
                          </p>
                          :

                          index % 10 === 5 ?
                            <p>
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                            </p>
                            :

                            index % 10 === 6 ?
                              <p>
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, ipsa? Vero ab assumenda, voluptatum fugit quos itaque cupiditate culpa nam. Facilis, reprehenderit aliquam quia quod modi recusandae. Id, perferendis eveniet.
                              </p>
                              :
                              <></>
              }
            </div>  
          </div>
        )}
      />
    </>
  );
}
