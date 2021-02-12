<script type="ts" context="module"> 
  export type Value = string;
  export type Type = 'text' | 'password' | 'number';
  export type Placeholder = string;
  export type MaxLength = number | undefined;
  export type MinLength = number | undefined;
</script>
<script type="ts">
  import { nanoid } from 'nanoid';
  import type {Rule} from 'src/@types/rule';

  export let value: Value = '';
  export let maxLength: MaxLength;
  export let minLength: MinLength;
  export let type: Type = 'text';
  export let placeholder: Placeholder = '';
  export let rules: Rule[];
  
  const id = nanoid();
  let message = '';
  let targetValue = value;

  $: validateRules = (value) => {
    for(let i = 0, length = rules.length; i < length; i ++) {
      const rule = rules[i];
      if(rule.required && !value) {
        return rule.message;
      }
      if(rule.pattern && !rule.pattern.test(value)) {
        return rule.message;
      }
    }
  }

  $: handleChange = (event) => {
    targetValue = event.target.value;
    if(maxLength && value.length > maxLength) {
      event.preventDefault();
      return;
    }
    if(minLength && value.length < minLength) {
      event.preventDefault();
      return;
    }
    if(rules) {
      const errorMsg = validateRules(event.target.value);
      if(errorMsg) {
        message = errorMsg;
        return false;
      }
    }
    message = '';
    value = event.target.value;
  }

  $: handleBulr = (event) => {
    targetValue = event.target.value;
    const errorMsg = validateRules(event.target.value);
    if(errorMsg) {
      message = errorMsg;
    }
  }
  
</script>

<div class="field">
  <label for={id} class="field__label">
    <span class="field__label-text" class:active={!!targetValue}>{placeholder}</span>
    <input id={id} type={type} value={value} min={minLength} max={maxLength} class="field__label-input" class:active={!!targetValue} on:input={handleChange} on:blur={handleBulr}/>
  </label>
  <div class="field__icon">
    <slot></slot>
  </div>
</div>
{#if message}
<p class="error">{message}</p>
{/if}

<style lang="scss">
  .field {
    display: flex;
    position: relative;
    height: 36px;
    padding: 0 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    align-items: center;

    &__icon {
      flex: 1 1 auto;
      padding-right: 8px;
    }
    
    &__label {
      flex: 1 1 auto;
      width: 100%;
      cursor: text;
      &-text {
        position: absolute;
        left: 10px;
        top: 0;
        transform-origin: 0 50%;
        transition: all 300ms;
        color: #999;
        line-height: 36px;
      
        &.active {
          transform: scale(.833) translateY(-10px);
        }
      }
      &-input {
        border: 0;
        width: 100%;
        height: 100%;
        &.active {
          padding-top: 10px;
        }
        &:focus {
          outline: none;
        }
      }
    }
  }

  .error {
    margin-top: 5px;
    color: red;
    text-align: left;
  }
  
</style>