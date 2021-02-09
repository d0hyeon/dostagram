<script type="ts">
  import { nanoid } from 'nanoid';
  type Value = string;
  type Type = 'text' | 'password' | 'number';
  type Placeholder = string;
  type MaxLength = number | undefined;
  type MinLength = number | undefined;

  export let value: Value = '';
  export let maxLength: MaxLength;
  export let minLength: MinLength;
  export let type: Type = 'text';
  export let placeholder: Placeholder = '';
  
  const id = nanoid();

  $: onChange = (event) => {
    if(maxLength && value.length > maxLength) {
      event.preventDefault();
      return;
    }
    if(minLength && value.length < minLength) {
      event.preventDefault();
      return;
    }
    value = event.target.value;
  }
  
</script>

<div class="field">
  <label for={id} class="field__label">
    <span class="field__label-text" class:active={!!value}>{placeholder}</span>
    <input id={id} type={type} value={value} min={minLength} max={maxLength} class="field__label-input" class:active={!!value} on:input={onChange}/>
  </label>
  <div class="field__icon">
    <slot></slot>
  </div>
</div>

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
  
</style>