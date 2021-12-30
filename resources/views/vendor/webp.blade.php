<picture>
  <source type="image/webp" class="{{ $class ?? '' }}" srcset="/image/{{ $name }}.webp" alt="{{ $alt ?? '' }}">
  <img class="{{ $class ?? '' }}" src="/image/{{ $name }}.png" alt="{{ $alt ?? '' }}">
</picture>