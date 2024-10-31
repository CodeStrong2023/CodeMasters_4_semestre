package utn.tienda_libros.vista;

import org.springframework.beans.factory.annotation.Autowired;
import utn.tienda_libros.servicios.LibroServicios;

import javax.swing.*;

public class LibroFrom extends JFrame{
    LibroServicios libroServicio;
    private JPanel panel;

    @Autowired
    public  LibroFrom(LibroServicios libroServicio){
        this.libroServicio = libroServicio;
        iniciarForm();
    }
    private  void iniciarForm(){
        setContentPane(panel);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setVisible(true);
        setSize(900, 700);
    }
}
