document.addEventListener('DOMContentLoaded', function () {
    const tagInput = document.getElementById('tag-input');
    const tagsContainer = document.getElementById('tags-container');
    const tagsHiddenInput = document.getElementById('tags-hidden');

    tagInput.addEventListener('keypress', function (event) {
        if (event.key === ',' || event.key === 'Enter') {
            event.preventDefault();
            const tagText = tagInput.value.trim();
    
            if (tagText && !isTagDuplicate(tagText)) { // Prevent duplicate tags
                // Create tag element
                const tagElement = document.createElement('span');
                tagElement.classList.add('tag');
                tagElement.dataset.value = tagText; // Store actual tag value
                tagElement.innerHTML = `${tagText} `;
    
                // Create remove button
                const removeButton = document.createElement('button');
                removeButton.textContent = 'x';
                removeButton.classList.add('remove-tag');
                removeButton.addEventListener('click', function () {
                    tagsContainer.removeChild(tagElement);
                    updateHiddenTagsInput();
                });
    
                tagElement.appendChild(removeButton);
                tagsContainer.appendChild(tagElement);
                tagInput.value = '';
    
                updateHiddenTagsInput();
            }
        }
    });

    function addTag(tagText) {
        const tagsContainer = document.getElementById('tags-container');
        const tagElement = document.createElement('span');
        tagElement.classList.add('tag');
        tagElement.dataset.value = tagText;
        tagElement.innerHTML = `${tagText} <button type="button" class="btn-close remove-tag" aria-label="Close" onclick="removeTag('${tagText}')"></button>`;
        tagsContainer.appendChild(tagElement);
        updateHiddenTagsInput();
    }

    function removeTag(tag) {
        const tagsContainer = document.getElementById('tags-container');
        const tags = Array.from(tagsContainer.getElementsByClassName('tag'));
        tags.forEach(tagElement => {
            if (tagElement.dataset.value === tag) {
                tagsContainer.removeChild(tagElement);
            }
        });
        updateHiddenTagsInput();
    }

    function updateHiddenTagsInput() {
        const tags = Array.from(document.getElementsByClassName('tag')).map(tagElement => tagElement.dataset.value);
        document.getElementById('tags-hidden').value = JSON.stringify(tags);
    }

    function isTagDuplicate(tag) {
        return Array.from(document.getElementsByClassName('tag')).some(tagElement => tagElement.dataset.value === tag);
    }

    function renderTags() {
        const tagsContainer = document.getElementById('tags-container');
        const tagsHiddenInput = document.getElementById('tags-hidden');
        let tags = [];

        try {
            tags = JSON.parse(tagsHiddenInput.value) || [];
        } catch (error) {
            tags = tagsHiddenInput.value.split(',').map(tag => tag.trim());
        }

        tagsContainer.innerHTML = ''; // Clear existing tags
        tags.forEach(tag => addTag(tag)); // Render all tags with remove buttons
    }
});


function initializeFormValidation() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var forms = document.querySelectorAll('.needs-validation');

        Array.prototype.slice.call(forms).forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    });
}

initializeFormValidation();

// Gemini Integration for AI Suggestions
async function generateText(fieldId) {
    let inputElement = document.getElementById(fieldId);
    let userInput = inputElement.value.trim();

    if (!userInput) {
        alert("Please enter some text before generating.");
        return;
    }

    try {
        const response = await fetch("/generate-text", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ fieldId, userInput }),
        });

        const data = await response.json();
        if (data.generatedText) {
            inputElement.value = data.generatedText; // Display the generated text
        } else {
            alert("Failed to generate AI text.");
        }
    } catch (error) {
        console.error("Error generating text:", error);
        alert("AI request failed.");
    }
}
