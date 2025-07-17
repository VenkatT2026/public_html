class AiCookApp {
    constructor() {
        this.apikey = localStorage.getItem('apikey');
        this.initializeElements();
        this.bindEvents();
        this.loadApiKey();
    }
    initializeElements() {
        this.apiKeyInput = document.getElementById('apiKey');
        this.saveApiKeyBtn = document.getElementById('saveApiKey');
        this.ingredientsInput = document.getElementById('ingredients');
        this.generateRecipeBtn = document.getElementById('generateRecipe'); 
        this.dietarySelect = document.getElementById('dietary');
        this.cuisineSelect = document.getElementById('cuisine');
        this.loading = document.getElementById('loading');
        this.recipeSection = document.getElementById('recipeSection');
        this.recipeContent = document.getElementById('recipeContent');
    }
    bindEvents() {
        this.saveApiKeyBtn.addEventListener('click', () => this.saveApiKey());
        this.generateRecipeBtn.addEventListener('click', () => this.generateRecipe());
        this.apiKeyInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.saveApiKey();
            }
        });
        this.ingredientsInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.generateRecipe();
            }
        });
    }
    saveApiKey() {
        const apiKey = this.apiKeyInput.value.trim();
        if (apiKey) {
            localStorage.setItem('apikey', apiKey);
            this.apikey = apiKey;
            this.updateApiKeyStatus(true);
            this.showSuccess('API Key saved Sucessfully!')

        } else {
            this.showError('Please enter a valid API Key')
        }
    }

    loadApiKey() {
        if (this.apikey) {
            this.apiKeyInput.value = this.apikey;
            this.updateApiKeyStatus(true);
        } else {
            this.updateApiKeyStatus(false);
        }
    }

    updateApiKeyStatus(isValid) {
        if (isValid) {
            this.saveApiKeyBtn.textContent = 'Saved ✅';
            this.saveApiKeyBtn.style.background = 'green'
        }
        else {
            this.saveApiKeyBtn.textContent = 'Save';
            this.saveApiKeyBtn.style.background = '' // Revert to default
        }
    }

    async generateRecipe() {
        if (!this.apikey) {
            this.showError('Please enter a valid API Key.');
            return;
        }
        const ingredients = this.ingredientsInput.value.trim();
        if (!ingredients) {
            this.showError('Please enter some ingredients.');
            return;
        }
        this.showLoading(true);
        this.hideRecipe();

        try {
            const recipe = await this.callGeminiAPI(ingredients);
            this.displayRecipe(recipe);
        } catch (error) {
            console.error('cooked', error);
            this.showError('An error occurred while generating the recipe.');
        } finally {
            this.showLoading(false);

        }
    }

    showLoading(show) {
        if (show) {
            this.loading.classList.add('show');
            this.generateRecipeBtn.disabled = true;
            this.generateRecipeBtn.textContext = 'gernerating....'
        } else {
            this.loading.classList.remove('show');
            this.generateRecipeBtn.disabled = false;
            this.generateRecipeBtn.textContext = 'Generate Recipe'
        }
    }

    hideRecipe() {
        this.recipeSection.classList.remove('show');
    }

    showRecipe() {
        this.recipeSection.classList.add('show');
    
    }

    showError(message) {
        // A simple alert for now, you can replace this with a more elegant UI element
        alert(message);
    }

    showSuccess(message) {
        // A simple alert for now
        alert(message);
    }

    async callGeminiAPI(ingredients) {
        const dietary = this.dietarySelect.value;
        const cuisine = this.cuisineSelect.value;

        let prompt = `create a detailed recipe using these ingreidents: ${ingredients}. `;
        if (dietary) {
            prompt += `Dietary preferences: ${dietary}.`;
        }
        if (cuisine) {
            prompt += `Cuisine Type: ${cuisine}.`;
        }
        prompt += `Please format your response as follows: 
        - recipe name
        - prep time
        - cook time
        - servings
        - ingredients with quantities
        - instructions (numbered steps)
        - tips (optional)
        make sure the recipe is practical and delicious!`;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.apikey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 2048,
                        topP: 0.95,
                        topK: 40,
                    },
                }),
            });
        

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error (`HTTp error! status: ${errorData.error?.message || 'Unknown error'}`)
            }
            const data = await response.json();
            return data.candidates[0].content.parts[0].text.trim();
    }

    displayRecipe(recipeText) {
        const formattedRecipe = this.formatRecipe(recipeText);
        this.recipeContent.innerHTML = formattedRecipe;
        this.showRecipe();

    }

    formatRecipe(text){
        return text;
    }
}

document.addEventListener("DOMContentLoaded", () => new AiCookApp());
