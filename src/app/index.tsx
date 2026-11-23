import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRECIO = 10000;
const VERDE = '#39A900'; // verde SENA

const formatoCOP = (valor: number) =>
  '$' + valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// Pantalla 1: pantalla inicial con el nombre de la app
function Inicio() {
  return (
    <View style={styles.centrado}>
      <Text style={styles.titulo}>App SENA</Text>
    </View>
  );
}

// Pantallas 2 y 3: tarjeta de producto con selector de cantidad
function Producto() {
  const [cantidad, setCantidad] = useState(1);

  const sumar = () => setCantidad((c) => c + 1);
  const restar = () => setCantidad((c) => (c > 1 ? c - 1 : 1));

  return (
    <View style={styles.pantalla}>
      <Text style={styles.tituloArriba}>App SENA</Text>

      <View style={styles.tarjeta}>
        <Text style={styles.nombreProducto}>Producto</Text>
        <Text style={styles.precio}>{formatoCOP(PRECIO)}</Text>

        <View style={styles.selector}>
          <TouchableOpacity style={styles.boton} onPress={sumar}>
            <Text style={styles.textoBoton}>+</Text>
          </TouchableOpacity>

          <Text style={styles.cantidad}>{cantidad}</Text>

          <TouchableOpacity style={styles.boton} onPress={restar}>
            <Text style={styles.textoBoton}>−</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.total}>Total: {formatoCOP(PRECIO * cantidad)}</Text>
      </View>
    </View>
  );
}

export default function Index() {
  const [cargando, setCargando] = useState(true);

  // La pantalla inicial se muestra 2 segundos y pasa al producto
  useEffect(() => {
    const t = setTimeout(() => setCargando(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <SafeAreaView style={styles.contenedor}>
      <StatusBar barStyle="dark-content" />
      {cargando ? <Inicio /> : <Producto />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#fff' },
  centrado: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  titulo: { fontSize: 34, fontWeight: 'bold', color: VERDE },

  pantalla: { flex: 1, alignItems: 'center', paddingTop: 40 },
  tituloArriba: { fontSize: 28, fontWeight: 'bold', color: VERDE, marginBottom: 40 },

  tarjeta: {
    width: '80%',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 3,
  },
  nombreProducto: { fontSize: 20, fontWeight: '600' },
  precio: { fontSize: 22, marginTop: 6, marginBottom: 20 },

  selector: { flexDirection: 'row', alignItems: 'center' },
  boton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: VERDE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBoton: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  cantidad: { fontSize: 24, marginHorizontal: 24, fontWeight: '600' },

  total: { marginTop: 24, fontSize: 18, fontWeight: 'bold' },
});