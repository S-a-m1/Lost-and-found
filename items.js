// Items management
class ItemsManager {
    constructor() {
        this.initializeItems();
    }

    initializeItems() {
        if (!localStorage.getItem('items')) {
            localStorage.setItem('items', JSON.stringify([]));
        }
    }

    getItems() {
        return JSON.parse(localStorage.getItem('items') || '[]');
    }

    addItem(item) {
        const items = this.getItems();
        const newItem = {
            id: Date.now().toString(),
            ...item,
            createdAt: new Date().toISOString()
        };
        items.push(newItem);
        localStorage.setItem('items', JSON.stringify(items));
        return newItem;
    }

    getItemsByUser(userId) {
        return this.getItems().filter(item => item.userId === userId);
    }

    getItemsByType(type) {
        return this.getItems().filter(item => item.type === type);
    }

    searchItems(query, type = null) {
        let items = this.getItems();
        
        if (type) {
            items = items.filter(item => item.type === type);
        }

        if (!query || query.trim() === '') {
            return items;
        }

        const searchTerm = query.toLowerCase();
        return items.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.location.toLowerCase().includes(searchTerm)
        );
    }

    deleteItem(itemId, userId) {
        const items = this.getItems();
        const item = items.find(i => i.id === itemId);
        
        if (!item) {
            return { success: false, message: 'Item not found' };
        }

        if (item.userId !== userId) {
            return { success: false, message: 'Unauthorized' };
        }

        const filteredItems = items.filter(i => i.id !== itemId);
        localStorage.setItem('items', JSON.stringify(filteredItems));
        return { success: true, message: 'Item deleted successfully' };
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
}

const itemsManager = new ItemsManager();
