import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Modal, TextInput, Alert, Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

const { height } = Dimensions.get('window');

type ZoneType = 'risk' | 'safe';

type Zone = {
  id: string;
  name: string;
  description?: string;
  type: ZoneType;
  latitude: number;
  longitude: number;
};

const MOCK_ZONES: Zone[] = [
  { id: '1', name: 'Bar el Nevado', description: 'Lugar donde solía beber', type: 'risk', latitude: 10.9878, longitude: -74.7889 },
  { id: '2', name: 'Fundación Shalom', description: 'Zona de apoyo y reuniones', type: 'safe', latitude: 10.9920, longitude: -74.7950 },
  { id: '3', name: 'Parque del recuerdo', description: '', type: 'risk', latitude: 10.9850, longitude: -74.7920 },
];

export default function ZonesScreen({ navigation }: any) {
  const [zones, setZones] = useState<Zone[]>(MOCK_ZONES);
  const [showModal, setShowModal] = useState(false);
  const [pendingCoord, setPendingCoord] = useState<{ latitude: number; longitude: number } | null>(null);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newType, setNewType] = useState<ZoneType>('risk');
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const webViewRef = useRef<WebView>(null);

  const getMapHTML = (zones: Zone[], isAdding: boolean) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { width: 100vw; height: 100vh; overflow: hidden; }
        #map { width: 100%; height: 100%; }
        #cursor-hint {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 13px;
          z-index: 1000;
          display: ${isAdding ? 'block' : 'none'};
          white-space: nowrap;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <div id="cursor-hint">Toca el mapa para marcar una zona</div>
      <script>
        const map = L.map('map', { zoomControl: true }).setView([10.9878, -74.7889], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap'
        }).addTo(map);

        const zones = ${JSON.stringify(zones)};
        const isAdding = ${isAdding};

        function makeIcon(color) {
          return L.divIcon({
            className: '',
            html: '<div style="background:' + color + ';width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>',
            iconSize: [18, 18],
            iconAnchor: [9, 9],
          });
        }

        zones.forEach(function(zone) {
          const color = zone.type === 'risk' ? '#FF6B6B' : '#4A7BF7';
          L.marker([zone.latitude, zone.longitude], { icon: makeIcon(color) })
            .addTo(map)
            .bindPopup('<b>' + zone.name + '</b><br/>' + (zone.description || '') + '<br/><small>' + (zone.type === 'risk' ? '🔴 Riesgo' : '🔵 Segura') + '</small>');
        });

        if (isAdding) {
          map.on('click', function(e) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'MAP_PRESS',
              latitude: e.latlng.lat,
              longitude: e.latlng.lng,
            }));
          });
        }
      </script>
    </body>
    </html>
  `;

  const handleWebViewMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === 'MAP_PRESS') {
      setPendingCoord({ latitude: data.latitude, longitude: data.longitude });
      setNewName('');
      setNewDescription('');
      setNewType('risk');
      setShowModal(true);
    }
  };

  const handleSaveZone = () => {
    if (!newName.trim() || !pendingCoord) return;
    const zone: Zone = {
      id: Date.now().toString(),
      name: newName.trim(),
      description: newDescription.trim(),
      type: newType,
      latitude: pendingCoord.latitude,
      longitude: pendingCoord.longitude,
    };
    setZones([...zones, zone]);
    setShowModal(false);
    setPendingCoord(null);
    setIsAdding(false);
  };

  const handleDeleteZone = (id: string) => {
    Alert.alert('Eliminar zona', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => setZones(zones.filter((z) => z.id !== id)) },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Mis zonas</Text>
          <Text style={styles.headerSubtitle}>Gestiona tus zonas de riesgo y seguras</Text>
        </View>
      </View>

      {/* Mapa */}
      <View style={styles.mapWrapper}>
        <WebView
          ref={webViewRef}
          source={{ html: getMapHTML(zones, isAdding) }}
          style={styles.map}
          onMessage={handleWebViewMessage}
          javaScriptEnabled
          domStorageEnabled
        />

        {/* Botón añadir */}
        <TouchableOpacity
          style={[styles.addButton, isAdding && styles.addButtonActive]}
          onPress={() => { setIsAdding(!isAdding); setPendingCoord(null); }}
        >
          <Feather name={isAdding ? 'x' : 'plus'} size={22} color={colors.white} />
        </TouchableOpacity>

        {/* Leyenda */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#4A7BF7' }]} />
            <Text style={styles.legendText}>Segura</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FF6B6B' }]} />
            <Text style={styles.legendText}>Riesgo</Text>
          </View>
        </View>
      </View>

      {/* Lista */}
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        <Text style={styles.listTitle}>Todas las zonas ({zones.length})</Text>
        {zones.map((zone) => (
          <TouchableOpacity
            key={zone.id}
            style={[styles.zoneCard, selectedZone?.id === zone.id && styles.zoneCardSelected]}
            onPress={() => setSelectedZone(zone)}
            activeOpacity={0.8}
          >
            <View style={[styles.zoneDot, { backgroundColor: zone.type === 'risk' ? '#FF6B6B' : '#4A7BF7' }]} />
            <View style={styles.zoneInfo}>
              <Text style={styles.zoneName}>{zone.name}</Text>
              {zone.description ? (
                <Text style={styles.zoneDescription} numberOfLines={1}>{zone.description}</Text>
              ) : null}
              <Text style={[styles.zoneType, { color: zone.type === 'risk' ? '#FF6B6B' : '#4A7BF7' }]}>
                {zone.type === 'risk' ? 'Zona de riesgo' : 'Zona segura'}
              </Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteZone(zone.id)}>
              <Feather name="trash-2" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        <View style={{ height: spacing.xl }} />
      </ScrollView>

      {/* Modal */}
      <Modal visible={showModal} transparent animationType="slide" statusBarTranslucent>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowModal(false)}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Nueva zona</Text>

            <Text style={styles.inputLabel}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Bar el centro..."
              placeholderTextColor={colors.border}
              value={newName}
              onChangeText={setNewName}
            />

            <Text style={styles.inputLabel}>Descripción (opcional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Lugar donde solía beber..."
              placeholderTextColor={colors.border}
              value={newDescription}
              onChangeText={setNewDescription}
            />

            <Text style={styles.inputLabel}>Tipo de zona</Text>
            <View style={styles.typeRow}>
              <TouchableOpacity
                style={[styles.typeButton, newType === 'risk' && styles.typeButtonRisk]}
                onPress={() => setNewType('risk')}
              >
                <View style={[styles.typeDot, { backgroundColor: '#FF6B6B' }]} />
                <Text style={[styles.typeButtonText, newType === 'risk' && styles.typeButtonTextSelected]}>Riesgo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeButton, newType === 'safe' && styles.typeButtonSafe]}
                onPress={() => setNewType('safe')}
              >
                <View style={[styles.typeDot, { backgroundColor: '#4A7BF7' }]} />
                <Text style={[styles.typeButtonText, newType === 'safe' && styles.typeButtonTextSelected]}>Segura</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.saveButton, !newName.trim() && styles.saveButtonDisabled]}
              disabled={!newName.trim()}
              onPress={handleSaveZone}
            >
              <Text style={styles.saveButtonText}>Guardar zona</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  headerTitle: { fontSize: fontSizes.lg, fontWeight: '700', color: colors.text },
  headerSubtitle: { fontSize: fontSizes.sm, color: colors.textMuted },
  mapWrapper: {
    height: height * 0.38,
    position: 'relative',
  },
  map: { flex: 1 },
  addButton: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.md,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  addButtonActive: { backgroundColor: colors.primary },
  legend: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    gap: spacing.xs,
    elevation: 3,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: fontSizes.xs, color: colors.text, fontWeight: '500' },
  list: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg },
  listTitle: { fontSize: fontSizes.md, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  zoneCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  zoneCardSelected: { borderWidth: 2, borderColor: colors.accent },
  zoneDot: { width: 14, height: 14, borderRadius: 7, flexShrink: 0 },
  zoneInfo: { flex: 1 },
  zoneName: { fontSize: fontSizes.md, fontWeight: '700', color: colors.text },
  zoneDescription: { fontSize: fontSizes.xs, color: colors.textMuted, marginTop: 2 },
  zoneType: { fontSize: fontSizes.xs, fontWeight: '600', marginTop: 2 },
  deleteButton: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  modalTitle: { fontSize: fontSizes.lg, fontWeight: '800', color: colors.text, marginBottom: spacing.sm },
  inputLabel: { fontSize: fontSizes.sm, fontWeight: '700', color: colors.text, marginTop: spacing.xs },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSizes.md,
    color: colors.text,
  },
  typeRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xs },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
  },
  typeButtonRisk: { backgroundColor: '#FFF0F0', borderColor: '#FF6B6B' },
  typeButtonSafe: { backgroundColor: '#F0F4FF', borderColor: '#4A7BF7' },
  typeDot: { width: 10, height: 10, borderRadius: 5 },
  typeButtonText: { fontSize: fontSizes.md, color: colors.text, fontWeight: '500' },
  typeButtonTextSelected: { fontWeight: '700' },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  saveButtonDisabled: { opacity: 0.4 },
  saveButtonText: { color: colors.white, fontSize: fontSizes.lg, fontWeight: '700' },
});