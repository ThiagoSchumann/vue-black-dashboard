<template>
  <div class="row" v-if="list">
    <div class="col-12">
      <card>
        <h5 slot="header" class="title">{{ list.name }}</h5>
        <form @submit.prevent="addItem">
          <div class="row">
            <div class="col-md-4">
              <select v-model="newItem.product" class="form-control">
                <option disabled value="">Produto</option>
                <option v-for="(p, idx) in products" :key="idx" :value="p.name">
                  {{ p.name }}
                </option>
              </select>
            </div>
            <div class="col-md-2">
              <base-input label="Qtd" v-model.number="newItem.quantity" type="number" placeholder="1" />
            </div>
            <div class="col-md-2">
              <base-input label="Peso (kg)" v-model.number="newItem.weight" type="number" step="0.01" />
            </div>
            <div class="col-md-2 d-flex align-items-end">
              <base-button type="primary" native-type="submit" fill>Adicionar</base-button>
            </div>
          </div>
        </form>
        <base-input class="mt-3" label="Pesquisar" v-model="search" />
        <div class="table-responsive">
          <table class="table table-striped">
            <thead class="text-primary">
              <tr>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Peso</th>
                <th class="text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in filteredItems" :key="idx">
                <td>{{ item.product }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.weight }}</td>
                <td class="text-right">
                  <base-button size="sm" type="danger" @click="removeItem(idx)">Remover</base-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>
    </div>
  </div>
  <div v-else>
    Lista não encontrada
  </div>
</template>

<script>
export default {
  name: "ListDetail",
  data() {
    return {
      index: parseInt(this.$route.params.id, 10),
      lists: JSON.parse(localStorage.getItem("lists") || "[]"),
      products: JSON.parse(localStorage.getItem("products") || "[]"),
      newItem: { product: "", quantity: 1, weight: 0 },
      search: "",
    };
  },
  computed: {
    list() {
      return this.lists[this.index];
    },
    filteredItems() {
      if (!this.search) return this.list.items;
      const s = this.search.toLowerCase();
      return this.list.items.filter((i) => i.product.toLowerCase().includes(s));
    },
  },
  methods: {
    addItem() {
      if (!this.newItem.product) return;
      this.list.items.push({ ...this.newItem });
      this.save();
      this.newItem = { product: "", quantity: 1, weight: 0 };
    },
    removeItem(idx) {
      this.list.items.splice(idx, 1);
      this.save();
    },
    save() {
      this.lists.splice(this.index, 1, this.list);
      localStorage.setItem("lists", JSON.stringify(this.lists));
    },
  },
};
</script>

<style scoped>
.table {
  margin-top: 1rem;
}
</style>

