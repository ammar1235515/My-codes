import pygame, math

class AimingDot (pygame.sprite.Sprite):
    #Constructor (Build our sprite/object)
    def __init__(self, distance):
        super().__init__()
        self.distance = distance
        self.image = pygame.image.load("images/sphere-19.png") # Set up image for sprite
        self.image = pygame.transform.smoothscale(self.image, (10,10)) # Image size
        self.rect = self.image.get_rect() #Get rect of image and make it our hitbox
        self.rect.center = (200, 650-self.distance)#
        self.angle = 270

    def update(self, change):
        self.angle += change
        if 190 < self.angle < 350:
            r_angle = math.radians(self.angle)
            x = math.cos(r_angle) * self.distance
            y = math.sin(r_angle) * self.distance
            self.rect.center = (200 + x, 650+y)
        else:
            self.angle -= change
