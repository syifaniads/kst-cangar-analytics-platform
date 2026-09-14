let bookingData = [];
let uploadedBuktiId = null;
let uploadedBuktiUrl = null;

document.addEventListener("DOMContentLoaded", async () => {
  if (!localStorage.getItem("kst_access_token")) return;
  showBookingLoading();
  await loadBooking();
});

function showBookingLoading() {
  const tbody = document.getElementById("bookingTableBody");
  if (tbody) {
    tbody.innerHTML = `
<tr><td colspan="14" style="padding:30px;text-align:center;color:#9ca3af;">Memuat data booking...</td></tr>`;
  }
}

async function loadBooking() {
  try {
    const res = await apiRequest("/data/booking");
    const items = res?.data?.items || [];

    bookingData = items.map((item) => {
      const cols = colMap(item.colValues);
      return {
        rowId: item.rowId ?? null,
        nama: cols[0] ?? "-",
        kontak: cols[1] ?? "-",
        tipe: cols[2] ?? "-",
        checkin: cols[3] ?? "-",
        checkout: cols[4] ?? "-",
        jumlah_tamu: Number(cols[5] ?? 0),
        status: cols[6] ?? "-",
        unit: cols[7] && cols[8] ? `${cols[7]} ${cols[8]}` : "-",
        harga: Number(cols[9] ?? 0),
        invoice: cols[10] ?? "-",
        additional: cols[11] ?? "-",
        bukti: cols[12] ?? "-",
        receipt: cols[13] ?? "",
        alamat: cols[14] ?? ""
      };
    });

    renderBooking(bookingData);
    updateCards(bookingData);
  } catch (err) {
    console.error("Gagal memuat data booking:", err);
    renderBooking([]);
    updateCards([]);
  }
}

function updateCards(data) {
  const el = (id) => document.getElementById(id);
  if (el("stat-total-booking")) el("stat-total-booking").innerText = data.length;
  if (el("stat-pendapatan")) {
    const total = data.reduce((a, b) => a + (Number(b.harga) || 0), 0);
    el("stat-pendapatan").innerText = "Rp " + total.toLocaleString("id-ID");
  }
  if (el("stat-lunas")) {
    el("stat-lunas").innerText = data.filter((x) => ["confirmed", "lunas"].includes(String(x.status).toLowerCase())).length;
  }
  if (el("stat-belum")) {
    el("stat-belum").innerText = data.filter((x) => !["confirmed", "lunas"].includes(String(x.status).toLowerCase())).length;
  }
}

function renderBooking(data) {
  const tbody = document.getElementById("bookingTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="14" style="padding:30px;text-align:center;color:#9ca3af;">Belum ada data booking</td></tr>`;
    return;
  }

  data.forEach((item, index) => {
    const sl = String(item.status).toLowerCase();
    let badgeClass = "belum", badgeLabel = item.status;
    if (sl === "confirmed") { badgeClass = "lunas"; badgeLabel = "Lunas"; }
    else if (sl === "pending") { badgeClass = "dp"; badgeLabel = "Pending"; }
    else if (sl === "cancelled") { badgeClass = "belum"; badgeLabel = "Batal"; }

    tbody.innerHTML += `
<tr>
  <td>${index + 1}</td>
  <td>${item.nama}</td>
  <td>${item.jumlah_tamu}</td>
  <td>${item.checkin}</td>
  <td>${item.checkout}</td>
  <td>${item.kontak}</td>
  <td>${item.tipe}</td>
  <td>${item.unit}</td>
  <td>Rp ${Number(item.harga).toLocaleString("id-ID")}</td>
  <td><span class="badge ${badgeClass}">${badgeLabel}</span></td>
  <td>${item.bukti && item.bukti !== "-" ? getFileName(item.bukti) : "-"}</td>
  <td>${item.invoice}</td>
  <td>${item.additional}</td>
  <td>
    <button class="btn-aksi edit" onclick="editBooking(${index})">Edit</button>
    <button class="btn-aksi hapus" onclick="hapusBooking(${index})">Hapus</button>
  </td>
</tr>`;
  });
}

async function simpanBooking() {
  const nama = getVal("b-nama");
  const wa = getVal("b-wa");
  const tamu = getVal("b-tamu");
  const tipe = getVal("b-tipe");
  const unit = getVal("b-unit");
  const checkin = getVal("b-checkin");
  const checkout = getVal("b-checkout");
  const alamat = getVal("b-alamat");
  const harga = getVal("b-harga");
  const status = getVal("b-status");
  const receipt = getVal("b-receipt");
  const invoice = getVal("b-invoice");
  const additional = getVal("b-additional");

  if (!nama || !wa || !tipe || !checkin || !alamat) {
    alert("Harap isi semua field yang wajib (*)");
    return;
  }

  let serviceType = "glamping";
  let unitType = "";
  if (tipe === "Glamping Deluxe") unitType = "deluxe";
  if (tipe === "Glamping Long") unitType = "long";

  const unitNumber = parseInt(String(unit).replace(/\D/g, "")) || null;

  const payload = {
    nama_customer: nama,
    no_hp: wa,
    layanan: serviceType,
    unit_type: unitType,
    no_unit: unitNumber,
    jumlah_tamu: Number(tamu) || 1,
    tanggal_checkin: checkin,
    tanggal_checkout: checkout,
    alamat,
    harga: Number(harga) || 0,
    status_bayar: status,
    no_receipt: receipt,
    no_invoice: invoice,
    bukti_pembayaran_id: uploadedBuktiId,
    bukti_pembayaran_url: uploadedBuktiUrl,
    additional_needs: additional
  };

  const editIdxVal = getVal("bEditIndex");
  const isEdit = editIdxVal !== "" && bookingData[editIdxVal];

  try {
    if (isEdit) {
      const rowId = bookingData[editIdxVal].rowId;
      await apiRequest("/data/booking/" + rowId, "PUT", payload);
    } else {
      await apiRequest("/data/booking", "POST", payload);
    }
    await loadBooking();
  } catch (err) {
    alert("Gagal menyimpan booking: " + err.message);
  }
}

function editBooking(idx) {
  const editIdx = document.getElementById("bEditIndex");
  if (editIdx) editIdx.value = idx;
}

async function hapusBooking(idx) {
  const item = bookingData[idx];
  if (!item || !confirm('Hapus booking "' + item.nama + '"?')) return;
  try {
    if (item.rowId) await apiRequest("/data/booking/" + item.rowId, "DELETE");
    await loadBooking();
  } catch (err) {
    alert("Gagal menghapus: " + err.message);
  }
}

function colMap(colValues) {
  const map = {};
  if (Array.isArray(colValues)) colValues.forEach((c) => { map[c.colIdx] = c.value; });
  return map;
}

function getFileName(url) {
  if (!url || url === "-") return "-";
  try { return decodeURIComponent(url.split("/").pop()); }
  catch { return "Lihat File"; }
}

function getVal(id) { const el = document.getElementById(id); return el ? el.value : ""; }
